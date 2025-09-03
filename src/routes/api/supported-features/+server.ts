import { json } from '@sveltejs/kit';
import { getServerConfig, isAuthRequired } from '@/lib/services/config/config.server';
import type { SupportedFeatures } from '@/lib/services/supportedFeatures';

export async function GET() {
	const config = getServerConfig();

	return json({
		koji: !!config.koji && !!config.koji.url,
		geocoding: !!config.nominatim && !!config.nominatim.url,
		auth: !!config.auth?.enabled,
		authRequired: isAuthRequired()
	});
}
