import type { LngLat } from 'maplibre-gl';
import type { FeatureCollection, Polygon, Feature } from 'geojson';
import { RADIUS_POKEMON, RADIUS_SCOUT_GMO } from '@/lib/constants';
import { point, destination } from '@turf/turf';

export type ScoutRequest = {
	coords: {
		lat: number;
		lon: number;
	}[];
};

export type ScoutGeoProperties = {
	fillColor: string;
	strokeColor: string;
};

type ScoutData = ScoutRequest
	& { center: { lat: number; lon: number } }
	& { smallPoints: FeatureCollection<Polygon, ScoutGeoProperties> }
	& { bigPoints: FeatureCollection<Polygon, ScoutGeoProperties> }

const defaultScoutData: ScoutData = {
	center: { lat: 0, lon: 0 },
	coords: [],
	smallPoints: {
		type: 'FeatureCollection',
		features: []
	},
	bigPoints: {
		type: 'FeatureCollection',
		features: []
	}
};

let currentScoutData: ScoutData = $state(defaultScoutData);

export function getCurrentScoutData() {
	return currentScoutData;
}

export function setCurrentScoutCoords(coords: { lat: number; lon: number }[]) {
	currentScoutData.coords = coords;
}

export function setCurrentScoutCenter(center: { lat: number; lon: number }) {
	currentScoutData.center = center;
}

export function setScoutGeojson(smallPoints: Feature<Polygon, ScoutGeoProperties>[], bigPoints: Feature<Polygon, ScoutGeoProperties>[]) {
	currentScoutData.smallPoints.features = smallPoints;
	currentScoutData.bigPoints.features = bigPoints
}

export function resetCurrentScoutData() {
	currentScoutData = defaultScoutData;
}

export async function startScout() {
	const response = await fetch('/api/scout', {
		method: 'POST',
		body: JSON.stringify(currentScoutData)
	});
	const data = await response.json()
	return !data.error
}

export async function getScoutQueue() {
	const response = await fetch('/api/scout');
	const data = await response.json();
	return data.result;
}

/**
 * Get scout coordinates, to cover a larger pokemon area
 * Function taken from ReactMap
 */
export function getCoords(center: { lat: number; lon: number }, size: 0 | 1 | 2) {
	if (size === 0) return [center]

	let distance

	if (size === 1) {
		distance = RADIUS_POKEMON * 1.732;
	} else if (size === 2) {
		distance = RADIUS_SCOUT_GMO * 1.732
	} else {
		return [center]
	}

	const start = [center.lon, center.lat];
	const coords = [center];

	return coords.concat(
		[0, 60, 120, 180, 240, 300].map((bearing) => {
			const [lon, lat] = destination(point(start), distance / 1000, bearing).geometry
				.coordinates;
			return { lat, lon };
		})
	);
}
