import type { PageLoad } from "../../../../../.svelte-kit/types/src/routes";
import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";

export const load: PageLoad = async ({ params, fetch }) => {
	if (!browser) return;
	// const data: StationData = await getOneMapObject('station', params.id);
	// console.log(data);
	//
	// setDirectLinkCoordinates({
	// 	lat: data?.lat,
	// 	lon: data?.lon
	// });
	// setDirectLinkObject({
	// 	type: 'station',
	// 	id: 'station-' + params.id
	// });
	//
	// makeMapObject(data, 'station');

	redirect(302, "/");
};