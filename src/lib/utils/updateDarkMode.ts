import { getUserSettings } from '@/lib/services/userSettings.svelte';

export function updateDarkMode() {
	function isDark() {
		if (getUserSettings().isDarkMode == null)
			return window.matchMedia('(prefers-color-scheme: dark)').matches;
		return getUserSettings().isDarkMode ?? false;
	}

	document.documentElement.classList[isDark() ? 'add' : 'remove']('dark');
}