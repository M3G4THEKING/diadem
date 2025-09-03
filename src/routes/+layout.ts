import { initAllIconSets } from '@/lib/services/uicons.svelte.js';
import { loadMasterFile } from '@/lib/services/masterfile';
import {
	getDefaultUserSettings,
	getUserSettings, getUserSettingsFromServer,
	setUserSettings,
	updateUserSettings
} from '@/lib/services/userSettings.svelte.js';
import { browser } from '$app/environment';
import { setConfig } from '@/lib/services/config/config';
import { loadKojiGeofences } from '@/lib/features/koji';
import { loadRemoteLocale } from '@/lib/services/ingameLocale';
import { resolveLanguageTag } from '@/lib/services/i18n';
import { updateSupportedFeatures } from '@/lib/services/supportedFeatures';
import { getUserDetails, updateUserDetails } from '@/lib/services/user/userDetails.svelte';

export const ssr = false;

export const load = async ({ fetch }) => {
	const configResponse = await fetch('/api/config');
	setConfig(await configResponse.json());

	const rawUserSettings = localStorage.getItem('userSettings');

	if (rawUserSettings) {
		setUserSettings(JSON.parse(rawUserSettings));
	} else {
		setUserSettings(getDefaultUserSettings());
	}

	updateUserSettings();
};
