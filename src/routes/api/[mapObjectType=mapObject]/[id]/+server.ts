import { json } from '@sveltejs/kit';
import {env} from '$env/dynamic/private'
import { getServerConfig } from '@/lib/services/config/config.server';
import { hasFeatureAnywhere } from '@/lib/services/user/checkPerm';

import { noPermResult } from "@/lib/server/api/results";
import type { MapData, MapObjectType } from "@/lib/types/mapObjectData/mapObjects";
import {
	querySingleGym,
	querySinglePokemon,
	querySinglePokestop,
	querySingleStation
} from "@/lib/server/api/querySingleMapObject";

export async function GET({ params, locals }) {
	if (!hasFeatureAnywhere(locals.perms, params.mapObjectType)) return json(noPermResult())

	const id: string = params.id
	const type = params.mapObjectType as MapObjectType
	let result: { error: undefined | string, result: MapData[] } = { error: "Internal Error", result: [] }

	if (type === "pokemon") {
		result = await querySinglePokemon(id)
	} else if (type === "gym") {
		result = await querySingleGym(id)
	} else if (type === "pokestop") {
		result = await querySinglePokestop(id)
	} else if (type === "station") {
		result = await querySingleStation(id)
	}

	return json(result)
}
