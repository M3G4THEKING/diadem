import type { AnyFilterset, FiltersetPokemon, MinMax } from '@/lib/features/filters/filtersets';

export function changeAttributeMinMax(
	data: AnyFilterset,
	attribute: string,
	minBounds: number,
	maxBounds: number,
	min: number,
	max: number
) {
	if (min === minBounds && max === maxBounds) {
		// @ts-ignore
		delete data?.[attribute];
	} else {
		// @ts-ignore
		data[attribute] = { min, max };
	}
}