import { json } from '@sveltejs/kit';
import { fetchKojiGeofences } from '@/lib/koji.server';

export async function GET(event) {
	return json(await fetchKojiGeofences(event.fetch))
}
