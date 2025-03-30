import { json } from '@sveltejs/kit';
import { query } from '@/lib/db.server';

export async function POST({ request }) {
	const reqBody = await request.json()
	const result = await query(
		"SELECT * FROM station " +
		"WHERE lat BETWEEN ? AND ? " +
		"AND lon BETWEEN ? AND ? " +
		"AND is_battle_available = 1 " +
		"LIMIT 10000",
		[reqBody.minLat, reqBody.maxLat, reqBody.minLon, reqBody.maxLon]
	)
	return json(result)
}