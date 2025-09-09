import type { Snippet } from 'svelte';

export type FiltersetPage = 'new' | 'overview' | 'attribute'
let currentPage: FiltersetPage = $state("new");
let previousPage: FiltersetPage = $state("new");
let attributePage: Snippet | undefined = $state(undefined);

export function setCurrentFiltersetPage(page: FiltersetPage) {
	previousPage = currentPage
	currentPage = page
}

export function getCurrentFiltersetPage() {
	// return "overview"
	return currentPage
}

export function setCurrentAttributePage(page: Snippet) {
	attributePage = page
}

export function getCurrentAttributePage() {
	// return undefined
	return attributePage
}

export function getPreviousFiltersetPage() {
	// return "overview"
	return previousPage
}