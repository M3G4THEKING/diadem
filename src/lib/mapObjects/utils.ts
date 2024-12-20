import { type Map, type LngLatBounds, type LngLatLike, Point } from 'maplibre-gl';
import { getUserSettings } from '@/lib/userSettings.svelte';

function applyPadding(map: Map, coordinates: LngLatLike, method: "sub"|"add") {
	let point = map.project(coordinates)
	point = point[method](new Point(getUserSettings().loadMapObjectsPadding, -getUserSettings().loadMapObjectsPadding))
	return map.unproject(point)
}

export function getNormalizedBounds(map: Map) {
	const bounds = map.getBounds()

	const minCoords = applyPadding(map, bounds.getSouthWest(), "sub")
	const maxCoords = applyPadding(map, bounds.getNorthEast(), "add")

	return {
		minLat: minCoords.lat,
		minLon: minCoords.lng,
		maxLat: maxCoords.lat,
		maxLon: maxCoords.lng
	}
}