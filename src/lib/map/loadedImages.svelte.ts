let loadedImages: { [key: string]: HTMLImageElement | ImageBitmap } = $state({});

export function getLoadedImages() {
	return loadedImages;
}