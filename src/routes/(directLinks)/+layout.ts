import { getConfig, setConfig } from "@/lib/services/config/config";
import { initAllIconSets, initIconSet } from '@/lib/services/uicons.svelte';
import { loadRemoteLocale } from '@/lib/services/ingameLocale';

export const ssr = true;

export const load = async ({ fetch }) => {
	const configResponse = await fetch("/api/config");
	setConfig(await configResponse.json());

	await Promise.all([
		initAllIconSets(fetch),
		loadRemoteLocale(getConfig().general.defaultLocale, fetch)
	])
};