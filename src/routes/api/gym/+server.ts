import { json } from '@sveltejs/kit';
import { query } from '@/lib/server/db/external/internalQuery';
import { hasFeatureAnywhere } from '@/lib/services/user/checkPerm';

import { noPermResult } from '@/lib/server/api/results';

export async function POST({ request, locals }) {
	if (!hasFeatureAnywhere(locals.perms, "gym")) return json(noPermResult())

	const reqBody = await request.json()
	const result = await query(
		"SELECT * FROM gym " +
		"WHERE lat BETWEEN ? AND ? " +
		"AND lon BETWEEN ? AND ? " +
		"AND deleted = 0 " +
		"LIMIT 10000",
		[reqBody.minLat, reqBody.maxLat, reqBody.minLon, reqBody.maxLon]
	)
	return json(result)
}