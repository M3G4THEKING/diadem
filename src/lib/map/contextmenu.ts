import maplibre from 'maplibre-gl';
import {
	setContextMenuEvent,
	setIsContextMenuOpen
} from '@/components/ui/contextmenu/utils.svelte';

export let pressTimer: NodeJS.Timeout[] = [];
export const longPressDuration = 500;

export function onContextMenu(event: maplibre.MapTouchEvent | maplibre.MapMouseEvent) {
	setContextMenuEvent(event);
	setIsContextMenuOpen(true);
}

export function clearPressTimer() {
	pressTimer.forEach((t) => clearTimeout(t));
	pressTimer = [];
}