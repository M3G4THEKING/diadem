import { json } from "@sveltejs/kit";
import { hasFeatureAnywhere } from "@/lib/services/user/checkPerm";

import { noPermResult } from "@/lib/server/api/results";
import type { MapObjectType } from "@/lib/types/mapObjectData/mapObjects";
import { querySingleMapObject } from "@/lib/server/api/querySingleMapObject";

export async function GET({ params, locals }) {
	if (!hasFeatureAnywhere(locals.perms, params.queryMapObject)) return json(noPermResult());

	const id: string = params.id;
	const type = params.queryMapObject as MapObjectType;

	return json(await querySingleMapObject(type, id));
}
