import { json } from '@sveltejs/kit';
import { query } from '@/lib/server/db/external/internalQuery';
import { hasFeatureAnywhere } from '@/lib/services/user/checkPerm';

import { noPermResult } from '@/lib/server/api/results';

export async function GET({ params, locals }) {
	if (!hasFeatureAnywhere(locals.perms, "pokestop")) return json(noPermResult())

	const result = await query(
		'SELECT * FROM pokestop ' +
			'LEFT JOIN incident ON incident.pokestop_id = pokestop.id ' +
			'WHERE pokestop.id = ?',
		[params.id]
	);
	return json(result);
}