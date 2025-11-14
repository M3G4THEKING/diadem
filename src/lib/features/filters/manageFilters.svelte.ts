import  { closeModal, type ModalType } from '@/lib/ui/modal.svelte';
import type { AnyFilterset, BaseFilterset } from "@/lib/features/filters/filtersets";
import type { AnyFilter, FilterCategory } from "@/lib/features/filters/filters";
import { getUserSettings, updateUserSettings } from "@/lib/services/userSettings.svelte";
import { updateAllMapObjects } from '@/lib/mapObjects/updateMapObject';

let currentSelectedFilterset: {
	category: FilterCategory,
	data: AnyFilterset
} | undefined = $state(undefined)

let currentSelectedAttribute: AnyFilterset | undefined = $state(undefined)

export function setCurrentSelectedFilterset(category: FilterCategory, data: AnyFilterset) {
	currentSelectedFilterset = { category, data }
}

export function resetCurrentSelectedFilterset() {
	currentSelectedFilterset = undefined
}

export function getCurrentSelectedFilterset() {
	return currentSelectedFilterset
}

export function existsCurrentSelectedFilterset() {
	if (!getCurrentSelectedFilterset()) {
		return false
	} else {
		return getUserSettings().filters[getCurrentSelectedFilterset()?.category]?.filters.some(f => f.id === getCurrentSelectedFilterset().data.id)
	}
}

export function saveSelectedFilterset() {
	const filterset = currentSelectedFilterset

	if (filterset) {
		const filters: AnyFilterset[] | undefined = getUserSettings().filters[filterset.category]?.filters
		if (!filters) return

		const exists = filters.some(f => f.id === filterset.data.id)
		if (exists) {
			getUserSettings().filters[filterset.category].filters = filters.map(f => f.id === filterset.data.id ? filterset.data : f)
		} else {
			getUserSettings().filters[filterset.category].filters.push(filterset.data)
		}

		updateUserSettings();
		updateAllMapObjects().then();
	}
}

export function getCurrentSelectedAttribute() {
	return currentSelectedAttribute
}

export function setCurrentSelectedAttribute() {
	if (currentSelectedFilterset) currentSelectedAttribute = $state.snapshot(currentSelectedFilterset.data)
}

export function resetCurrentSelectedAttribute() {
	currentSelectedAttribute = undefined
}

export function saveCurrentSelectedAttribute() {
	if (currentSelectedFilterset) currentSelectedFilterset.data = currentSelectedAttribute
}

export function getNewFilterset(): BaseFilterset {
	return {
		id: crypto.randomUUID(),
		title: "?",
		icon: "💯",
		enabled: true
	}
}