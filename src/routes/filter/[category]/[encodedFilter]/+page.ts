import type { PageLoad } from "./$types";
import { browser } from '$app/environment';
import { setCurrentSelectedFilterset } from '@/lib/features/filters/filtersetPageData.svelte';

export const load: PageLoad = ({ data }) => {
	if (browser && data.category && data.filterset) {
		setCurrentSelectedFilterset(data.category, data.filterset, true, true)
	}
	return data;
};
