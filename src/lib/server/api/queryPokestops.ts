import type { Bounds } from "@/lib/mapObjects/mapBounds";
import type {
	AnyFilter,
	FilterInvasion,
	FilterLure,
	FilterPokestop,
	FilterPokestopPlain,
	FilterQuest
} from "@/lib/features/filters/filters";
import { LIMIT_POKESTOP } from "@/lib/constants";
import { query } from "@/lib/server/db/external/internalQuery";

export async function queryPokestops(bounds: Bounds, filter: FilterPokestop) {
	const sqlQueries: string[] = [];
	const sqlValues: any[] = [];

	sqlQueries.push(buildPokestopPlainQuery(bounds, sqlValues, filter.pokestopPlain))
	sqlQueries.push(buildQuestQuery(bounds, sqlValues, filter.quest))
	sqlQueries.push(buildLureQuery(bounds, sqlValues, filter.lure))

	const unionQuery = sqlQueries.join(" UNION ")

	const sqlQuery = `SELECT * FROM (${unionQuery}) AS pokestop LEFT JOIN incident ON incident.pokestop_id = pokestop.id LIMIT ${LIMIT_POKESTOP}`;
	return await query(sqlQuery, sqlValues);
}

function buildSubQuery(bounds: Bounds, sqlValues: any[]) {
	let sqlQuery =
		"SELECT * FROM pokestop " +
		"WHERE lat BETWEEN ? AND ? " +
		"AND lon BETWEEN ? AND ? " +
		"AND deleted = 0 ";
	sqlValues.push(bounds.minLat)
	sqlValues.push(bounds.maxLat)
	sqlValues.push(bounds.minLon)
	sqlValues.push(bounds.maxLon)
	return sqlQuery;
}

function buildPokestopPlainQuery(bounds: Bounds, sqlValues: any[], filter: FilterPokestopPlain) {
	let sqlQuery = buildSubQuery(bounds, sqlValues);
	if (filter.enabled && !filter.ignoreFilters) {
		for (const filterset of filter.filters) {
			if (filterset.isSponsored !== undefined) {
				sqlQuery += "AND sponsor_id ";
				filterset.isSponsored ? (sqlQuery += "> 0 ") : (sqlQuery += "== 0 ");
			}
			if (filterset.powerUpLevel !== undefined) {
				sqlQuery += "AND power_up_level BETWEEN ? AND ? ";
				sqlValues.push(filterset.powerUpLevel.min);
				sqlValues.push(filterset.powerUpLevel.max);
			}
			if (filterset.isArScanEligible !== undefined) {
				sqlQuery += "AND ar_scan_eligible ";
				filterset.isArScanEligible ? (sqlQuery += "== 1 ") : (sqlQuery += "!= 1 ");
			}
			if (filterset.hasDetatils !== undefined) {
				sqlQuery += "AND name IS NOT NULL ";
			}
		}
	}
	return sqlQuery;
}

function buildQuestQuery(bounds: Bounds, sqlValues: any[], filter: FilterQuest) {
	let sqlQuery = buildSubQuery(bounds, sqlValues);
	if (filter.enabled && !filter.ignoreFilters) {
		for (const filterset of filter.filters) {
			if (filterset.ar !== undefined) {
				if (filterset.ar === "ar" || filterset.ar === "all") {
					sqlQuery += "AND quest_target IS NOT NULL "
				}
				if (filterset.ar === "noar" || filterset.ar === "all") {
					sqlQuery += "AND alternative_quest_target IS NOT NULL "
				}
			}
			// other stuff has to be filtered in frontend
		}
	}
	return sqlQuery;
}

function buildLureQuery(bounds: Bounds, sqlValues: any[], filter: FilterLure) {
	let sqlQuery = buildSubQuery(bounds, sqlValues);
	if (filter.enabled && !filter.ignoreFilters) {
		for (const filterset of filter.filters) {
			if (filterset.items !== undefined) {
				sqlQuery += "AND lure_id IN ? ";
				sqlValues.push(filterset.items);
			}
		}
	}
	return sqlQuery;
}
