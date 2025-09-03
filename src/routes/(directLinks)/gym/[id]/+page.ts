import type { PageLoad } from "../../../../../.svelte-kit/types/src/routes";
import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";

export const load: PageLoad = async ({ params }) => {
	if (!browser) return;
	// const data: GymData = await getOneMapObject('gym', params.id);
	//
	// setDirectLinkCoordinates({
	// 	lat: data?.lat,
	// 	lon: data?.lon
	// });
	// setDirectLinkObject({
	// 	type: 'gym',
	// 	id: 'gym-' + params.id
	// });
	//
	// makeMapObject(data, 'gym');

	redirect(302, "/");
};