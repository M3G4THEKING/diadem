import { setConfig } from '@/lib/config/config';
import { initAllIconSets } from '@/lib/uicons.svelte';
import { loadMasterFile } from '@/lib/masterfile';
import { loadKojiGeofences } from '@/lib/koji';
import { updateSupportedFeatures } from '@/lib/enabledFeatures';
import { getUserDetails, updateUserDetails } from '@/lib/user/userDetails.svelte';
import { browser } from '$app/environment';
import {
	getDefaultUserSettings, getUserSettings,
	getUserSettingsFromServer,
	setUserSettings,
	updateUserSettings
} from '@/lib/userSettings.svelte';
import { loadRemoteLocale } from '@/lib/ingameLocale';
import { resolveLanguageTag } from '@/lib/i18n';

let isLoading = $state(true)

export function getIsLoading() {
	return isLoading
}

export async function load() {
	const configResponse = await fetch('/api/config');
	setConfig(await configResponse.json());

	await Promise.all([
		initAllIconSets(),
		loadMasterFile(),
		loadKojiGeofences(),
		updateSupportedFeatures(),
		updateUserDetails()
	]);

	if (browser) {
		let hasServerUserSettings = false

		if (getUserDetails().details) {
			hasServerUserSettings = await getUserSettingsFromServer()
		}

		if (!hasServerUserSettings) {
			const rawUserSettings = localStorage.getItem('userSettings');

			if (rawUserSettings) {
				setUserSettings(JSON.parse(rawUserSettings));
			} else {
				setUserSettings(getDefaultUserSettings());
			}

			updateUserSettings();
		}

		await loadRemoteLocale(resolveLanguageTag(getUserSettings().languageTag));
	}

	isLoading = false
}