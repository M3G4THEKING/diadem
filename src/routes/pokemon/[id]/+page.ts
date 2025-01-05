import type { PageLoad } from './$types'
import {redirect} from '@sveltejs/kit';
import { getUserSettings, updateUserSettings } from '@/lib/userSettings.svelte';
import { browser } from '$app/environment';
import { setDirectLinkCoordinates, setDirectLinkObject } from '@/lib/directLinks.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
	if (!browser) return
	const response = await fetch("/api/pokemon/" + params.id)
	const data = await response.json()

	setDirectLinkCoordinates({
		lat: data?.lat,
		lon: data?.lon
	})
	setDirectLinkObject({
		type: "pokemon",
		id: "pokemon-" + params.id,
	})

	redirect(302, "/")
}