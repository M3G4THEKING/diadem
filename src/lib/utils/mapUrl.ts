export function getMapsUrl(lat: number, lon: number) {
	return `https://maps.google.com?q=${lat},${lon}`;
}