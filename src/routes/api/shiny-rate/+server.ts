import { json } from "@sveltejs/kit";
import { checkFeatureInBounds, hasFeatureAnywhere } from "@/lib/services/user/checkPerm";

import { noPermResult } from "@/lib/server/api/results";
import type { MapObjectType } from "@/lib/types/mapObjectData/mapObjects";
import { queryMapObjects } from "@/lib/server/api/queryMapObjects";
import type { MapObjectRequestData } from "@/lib/mapObjects/updateMapObject";
import type { ShinyRateRequest, ShinyRateResponse } from "@/lib/server/api/queries";
import { queryShinyRate } from '@/lib/server/api/queryMisc';

export async function POST({ request, locals, params }) {
	const body: ShinyRateRequest = await request.json();
	return json(await queryShinyRate(body.pokemonId, body.formId));
}
