import type { PageServerLoad } from './$types';
import { getConfig, setConfig } from '@/lib/services/config/config';
import { loadRemoteLocale } from '@/lib/services/ingameLocale';
import { decodeFilterset } from '@/lib/features/filters/filtersetPageData.svelte';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const configResponse = await fetch("/api/config");
	setConfig(await configResponse.json());
	await loadRemoteLocale(getConfig().general.defaultLocale, fetch)

	const filterset = decodeFilterset(params.category, params.encodedFilter)
	const category = filterset ? params.category : undefined

	return { filterset, category };
};
