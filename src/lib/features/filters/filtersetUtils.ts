import type { AnyFilterset, FiltersetPokemon, MinMax } from '@/lib/features/filters/filtersets';
import * as m from '@/lib/paraglide/messages';

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

export function filterTitle(filterset: AnyFilterset | undefined) {
	if (!filterset) return m.unknown_filter()

	if (filterset.title.title) {
		return filterset.title.title
	}
	if (Object.keys(m).includes(filterset.title.message)) {
		// @ts-ignore
		return m[filterset.title.message]()
	}

	return m.unknown_filter()
}