import { getServerConfig } from '@/lib/services/config/config.server';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { getSinglePokemon } from '@/lib/server/api/golbatApi';
import { query } from '@/lib/server/db/external/internalQuery';

export async function querySinglePokemon(id: string) {
	const response = await getSinglePokemon(id)

	if (!response.ok) return {
		result: [],
		error: "Error"
	};

	const data = await response.json()

	return {
		result: [data],
		error: null
	}
}

export async function querySingleGym(id: string) {
	return await query('SELECT * FROM gym ' + 'WHERE gym.id = ?', [id])
}

export async function querySinglePokestop(id: string) {
	return await query(
		'SELECT * FROM pokestop ' +
		'LEFT JOIN incident ON incident.pokestop_id = pokestop.id ' +
		'WHERE pokestop.id = ?',
		[id]
	)
}

export async function querySingleStation(id: string) {
	return await query('SELECT * FROM station ' + 'WHERE station.id = ?', [id])
}