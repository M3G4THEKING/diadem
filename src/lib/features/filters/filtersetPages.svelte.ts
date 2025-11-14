import type { Snippet } from "svelte";
import { FiniteStateMachine } from "runed";
import { closeModal, type ModalType } from "@/lib/ui/modal.svelte.js";
import { saveCurrentSelectedAttribute, saveSelectedFilterset } from '@/lib/features/filters/manageFilters.svelte.js';
import type { AnyFilterset } from '@/lib/features/filters/filtersets';

export type FiltersetPage = "base" | "new" | "overview" | "attribute";
export type FiltersetSnippet<T extends AnyFilterset> = Snippet<[T]>
type PageEvents = "newFilter" | "save" | "close" | "reset" | "editAttribute" | "edit" | "select";

export let isFilterPageTransitionReverse = false
let attributePageDetails: { snippet?: FiltersetSnippet<AnyFilterset>, label?: string } = $state({
	snippet: undefined,
	label: undefined
});

const pageStates = new FiniteStateMachine<FiltersetPage, PageEvents>("new", {
	base: {
		edit: 'overview',
		close: "new",
		save: (modalType: ModalType) => {
			saveSelectedFilterset()
			closeModal(modalType)
		}
	},
	new: {
		_enter: () => {
			isFilterPageTransitionReverse = false
		},
		newFilter: "overview",
		reset: "new",
		select: "base"
	},
	overview: {
		close: "new",
		reset: "new",
		editAttribute: "attribute",
		save: (modalType: ModalType) => {
			saveSelectedFilterset()
			closeModal(modalType)
		}
	},
	attribute: {
		_enter: () => {
			isFilterPageTransitionReverse = true
		},
		close: "overview",
		reset: "new",
		save: () => {
			saveCurrentSelectedAttribute()
			return "overview"
		}
	}
});

export function filtersetPageReset() {
	pageStates.send("reset")
}

export function filtersetPageNew() {
	pageStates.send("newFilter")
}

export function filtersetPageEditAttribute() {
	pageStates.send("editAttribute")
}

export function filtersetPageClose(modalType: ModalType) {
	pageStates.send("close", modalType)
}

export function filtersetPageSave(modalType: ModalType) {
	pageStates.send("save", modalType)
}

export function getCurrentFiltersetPage() {
	return pageStates.current;
}

export function setCurrentAttributePage<T extends AnyFilterset>(snippet: FiltersetSnippet<T>, label: string) {
	attributePageDetails = {
		snippet: snippet as FiltersetSnippet<AnyFilterset>,
		label
	};
}

export function getCurrentAttributePage() {
	return attributePageDetails;
}
