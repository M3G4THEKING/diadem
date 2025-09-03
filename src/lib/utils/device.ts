import { innerWidth } from "svelte/reactivity/window";
import { getUserSettings } from "@/lib/services/userSettings.svelte";
import { openToast } from "@/lib/ui/toasts.svelte.js";
import * as m from "@/lib/paraglide/messages";

export function isMenuSidebar() {
	return (innerWidth.current ?? 0) > 725;
}

export function isUiLeft() {
	return isMenuSidebar() || getUserSettings().isLeftHanded;
}

export function canNativeShare(content: ShareData) {
	return navigator?.share && navigator.canShare && navigator.canShare(content);
}

export function hasClipboardWrite() {
	return navigator.clipboard && navigator.clipboard.writeText;
}

export function copyToClipboard(content: string) {
	navigator.clipboard
		.writeText(content)
		.then(() => openToast(m.clipboard_copied()))
		.catch((e) => openToast(m.clipboard_error()));
}