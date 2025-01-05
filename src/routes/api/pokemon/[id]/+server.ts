import { json } from '@sveltejs/kit';
import {env} from '$env/dynamic/private'
import { getServerConfig } from '@/lib/config.server';

export async function GET({ request, params }) {
	let url = getServerConfig().golbat.url || env.GOLBAT_BACKEND_URL
	url += "/api/pokemon/id/" + params.id

	const response = await fetch(
		url,
		{
			method: "GET",
			headers: {
				"Authorization": getServerConfig().golbat.auth || env.GOLBAT_BACKEND_AUTH,
			}
		}
	)

	return json(await response.json(), { status: 201 });
}
