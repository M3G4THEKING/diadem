import { json } from '@sveltejs/kit';
import { readConfig } from '@/lib/config.server';
import {env} from '$env/dynamic/private';

export async function GET() {
	const clientConfig = await readConfig();
	return json(clientConfig);
}
