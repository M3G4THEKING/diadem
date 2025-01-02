import { setIsContxtMenuOpen } from '@/components/ui/contextmenu/utils.svelte';

let isModalOpenState: boolean = $state(false)

export function isModalOpen() {
	return isModalOpenState
}

export function openModal() {
	setIsContxtMenuOpen(false)
	isModalOpenState = true
}

export function closeModal() {
	isModalOpenState = false
}
