import { json } from '@sveltejs/kit';
import { fetchKojiGeofences } from '@/lib/server/api/kojiApi';

export async function GET(event) {
	return json(await fetchKojiGeofences(event.fetch))
}
