import type maplibre from 'maplibre-gl';

let isContextMenuOpen: boolean = $state(false)
let contextMenuEvent: maplibre.MapTouchEvent | maplibre.MapMouseEvent | undefined = $state(undefined)

export function getIsContxtMenuOpen() {
	return isContextMenuOpen
}

export function setIsContextMenuOpen(state: boolean) {
	isContextMenuOpen = state
}

export function getContextMenuEvent() {
	return contextMenuEvent
}

export function setContextMenuEvent(event: maplibre.MapTouchEvent | maplibre.MapMouseEvent) {
	contextMenuEvent = event
}
