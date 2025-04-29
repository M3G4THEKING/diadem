import maplibre from 'maplibre-gl';
import {
	clearPressTimer,
	longPressDuration,
	onContextMenu,
	pressTimer
} from '@/lib/map/contextmenu';
import { clearLoadMapObjectsInterval, resetLoadMapObjects } from '@/lib/map/loadMapObjects';
import { updateAllMapObjects } from '@/lib/mapObjects/updateMapObject';
import {
	clearUpdateMapObjectsInterval,
	resetUpdateMapObjectsInterval
} from '@/lib/map/mapObjectsInterval';
import { getUserSettings, updateUserSettings } from '@/lib/userSettings.svelte';
import { setIsContextMenuOpen } from '@/components/ui/contextmenu/utils.svelte';
import { getMap } from '@/lib/map/map.svelte';

export async function onMapMoveEnd() {
	clearLoadMapObjectsInterval();
	updateAllMapObjects().then();

	const map = getMap();
	if (map) {
		resetUpdateMapObjectsInterval();

		getUserSettings().mapPosition.zoom = map.getZoom();
		getUserSettings().mapPosition.center = map.getCenter();
		updateUserSettings();
	}
}

export function onTouchStart(e: maplibre.MapTouchEvent) {
	pressTimer.push(setTimeout(() => onContextMenu(e), longPressDuration));
}

export async function onMapMoveStart() {
	clearPressTimer();
	clearUpdateMapObjectsInterval();

	setIsContextMenuOpen(false);
	resetLoadMapObjects();
}

export function onWindowFocus() {
	if (!getMap()) return;
	updateAllMapObjects();
	resetUpdateMapObjectsInterval();
}