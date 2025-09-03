import maplibre from 'maplibre-gl';
import { closePopup } from '@/lib/mapObjects/interact';
import { closeModal } from '@/lib/ui/modal.svelte.js';
import { openMenu } from '@/lib/ui/menus.svelte.js';

let map: maplibre.Map | undefined = $state(undefined);

export function getMap() {
	return map;
}

export function setMap(newMap: maplibre.Map | undefined) {
	map = newMap;
}

export function resetMap() {
	openMenu(null)
	// closePopup();
	closeModal();
	map?.easeTo({
		bearing: 0,
		pitch: 0
	});
}