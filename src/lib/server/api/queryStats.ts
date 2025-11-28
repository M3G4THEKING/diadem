import { query } from "@/lib/server/db/external/internalQuery";
import type { MasterStats, PokemonStatEntry } from "@/lib/server/api/queries";

type AllShinyStatsRow = {
	pokemon_id: number;
	form_id: number;
	"": {
		shinies: string;
		total: string;
		days: number;
	}[];
};

type AllSpawnStatsRow = {
	pokemon_id: number;
	form_id: number;
	"": {
		count: string;
		total_spawns: string;
		days: number;
	}[];
};

export async function queryMasterStats(): Promise<MasterStats> {
	// TODO: timeframe

	const allShinyStats = await query<AllShinyStatsRow[]>(
		"SELECT pokemon_id, form_id, SUM(count) as shinies, SUM(total) as total, COUNT(*) as days " +
			"FROM pokemon_shiny_stats " +
			"WHERE fence = 'world' " +
			"GROUP BY pokemon_id, form_id "
	);

	const allSpawnStats = await query<AllSpawnStatsRow[]>(
		"SELECT pokemon_id, form_id, SUM(count) as count, " +
			"(SELECT SUM(count) FROM pokemon_stats WHERE fence = 'world') as total_spawns, " +
			"COUNT(DISTINCT date) as days " +
			"FROM pokemon_stats " +
			"WHERE fence = 'world' " +
			"GROUP BY pokemon_id, form_id " +
			"HAVING count > 0"
	);

	const pokemon: { [key: string]: PokemonStatEntry } = {};
	let total = 0;
	let totalDays = 0;

	if (allShinyStats.result) {
		for (const row of allShinyStats.result) {
			const key = `${row.pokemon_id}-${row.form_id}`;
			if (!pokemon[key]) {
				pokemon[key] = {};
			}
			const stats = row[""][0];
			pokemon[key].shiny = {
				shinies: Number(stats?.shinies ?? 0),
				total: Number(stats?.total ?? 0),
				days: stats?.days ?? 0
			};
		}
	}

	if (allSpawnStats.result) {
		for (const row of allSpawnStats.result) {
			const key = `${row.pokemon_id}-${row.form_id}`;
			if (!pokemon[key]) {
				pokemon[key] = {};
			}
			const stats = row[""][0];

			const thisTotal = Number(stats?.total_spawns ?? 0);
			if (!total && thisTotal) {
				total = thisTotal;
				totalDays = stats?.days ?? 0;
			}

			pokemon[key].spawns = {
				count: Number(stats?.count ?? 0),
				days: stats?.days ?? 0
			};
		}
	}

	return {
		totalPokemon: {
			count: total,
			days: totalDays
		},
		pokemon,
		generatedAt: Date.now()
	};
}