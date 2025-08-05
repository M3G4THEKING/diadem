import { initAllIconSets } from '@/lib/uicons.svelte';
import { loadMasterFile } from '@/lib/masterfile';
import {
	getDefaultUserSettings,
	getUserSettings, getUserSettingsFromServer,
	setUserSettings,
	updateUserSettings
} from '@/lib/userSettings.svelte';
import { browser } from '$app/environment';
import { setConfig } from '@/lib/config/config';
import { loadKojiGeofences } from '@/lib/koji';
import { loadRemoteLocale } from '@/lib/ingameLocale';
import { resolveLanguageTag } from '@/lib/i18n';
import { updateSupportedFeatures } from '@/lib/enabledFeatures';
import { getUserDetails, updateUserDetails } from '@/lib/user/userDetails.svelte';

export const ssr = false;

// export const load = async ({ fetch }) => {
//
// };
