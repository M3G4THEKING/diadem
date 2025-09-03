import type { PageLoad } from "../../../../../.svelte-kit/types/src/routes";
import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";

export const load: PageLoad = async ({ params, fetch }) => {
	if (!browser) return;
	// const data: PokestopData = await getOneMapObject("pokestop", params.id)
	// console.log(data)
	//
	// setDirectLinkCoordinates({
	// 	lat: data?.lat,
	// 	lon: data?.lon
	// });
	// setDirectLinkObject({
	// 	type: 'pokestop',
	// 	id: 'pokestop-' + params.id
	// });
	//
	// makeMapObject(data, 'pokestop');

	redirect(302, "/");
};