import { json } from '@sveltejs/kit';
import { query } from '@/lib/server/db/external/internalQuery';
import { checkFeatureInBounds, hasFeatureAnywhere } from "@/lib/services/user/checkPerm";

import { noPermResult } from '@/lib/server/api/results';
import type { Bounds } from "@/lib/mapObjects/mapBounds";
import type { MapData, MapObjectType } from "@/lib/types/mapObjectData/mapObjects";
import { queryGyms, queryPokemon, queryPokestops, queryStations } from "@/lib/server/api/queryMapObjects";
import type { MapObjectRequestData } from '@/lib/mapObjects/updateMapObject';
import type { FilterPokemon } from '@/lib/features/filters/filters';

export async function POST({ request, locals, params }) {
	if (!hasFeatureAnywhere(locals.perms, params.mapObjectType)) return json(noPermResult())

	const data: MapObjectRequestData = await request.json()

	const bounds = checkFeatureInBounds(locals.perms, params.mapObjectType, data)

	const type = params.mapObjectType as MapObjectType
	let result: { error: undefined | string, result: MapData[] } = { error: "Internal Error", result: [] }

	if (type === "pokemon") {
		result = await queryPokemon(bounds, data.filter)
	} else if (type === "gym") {
		result = await queryGyms(bounds, data.filter)
	} else if (type === "pokestop") {
		result = await queryPokestops(bounds, data.filter)
	} else if (type === "station") {
		result = await queryStations(bounds, data.filter)
	}

	return json(result)
}