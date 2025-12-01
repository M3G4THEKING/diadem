import { error, json } from "@sveltejs/kit";
import { checkFeatureInBounds, hasFeatureAnywhere } from "@/lib/services/user/checkPerm";

import { noPermResult } from "@/lib/server/api/results";
import type { MapObjectType } from "@/lib/types/mapObjectData/mapObjects";
import { queryMapObjects } from "@/lib/server/api/queryMapObjects";
import type { MapObjectRequestData } from "@/lib/mapObjects/updateMapObject";

export async function POST({ request, locals, params }) {
	if (!hasFeatureAnywhere(locals.perms, params.queryMapObject)) return json(noPermResult());

	const data: MapObjectRequestData = await request.json();
	const type = params.queryMapObject as MapObjectType;
	const bounds = checkFeatureInBounds(locals.perms, params.queryMapObject, data);

	const queried = await queryMapObjects(type, bounds, data.filter)

	if (queried.error) {
		error(queried.error)
	}

	return json(queried.result);
}
