import { getUserSettings } from '@/lib/userSettings.svelte';
import { openToast } from '@/components/ui/toast/toastUtils.svelte';
import * as m from "@/lib/paraglide/messages"

function isDaySame(date1: Date, date2: Date) {
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	)
}

export function timestampToLocalTime(timestamp: number | null | undefined, showDate: boolean = false) {
	if (!timestamp) return ''

	const date = new Date(timestamp * 1000)

	if (showDate) {
		const today = new Date()

		if (isDaySame(today, date)) {
			return m.today_time({ time: date.toLocaleTimeString() })
		}

		today.setDate(today.getDate() - 1)
		if (isDaySame(today, date)) {
			return m.yesterday_time({ time: date.toLocaleTimeString() })
		}

		today.setDate(today.getDate() + 2)
		if (isDaySame(today, date)) {
			return m.tomorrow_time({ time: date.toLocaleTimeString() })
		}

		return date.toLocaleString()
	}

	return date.toLocaleTimeString()
}

export function currentTimestamp() {
	return Math.floor(Date.now() / 1000)
}

export function updateDarkMode() {
	function isDark() {
		if (getUserSettings().isDarkMode == null)
			return window.matchMedia('(prefers-color-scheme: dark)').matches;
		return getUserSettings().isDarkMode ?? false;
	}
	document.documentElement.classList[isDark() ? 'add' : 'remove']('dark');
}

let loadedImages: {[key: string]: HTMLImageElement | ImageBitmap} = $state({})

export function getLoadedImages() {
	return loadedImages
}

export function canNativeShare(content: ShareData) {
	return navigator.share && navigator.canShare && navigator.canShare(content)
}

export function hasClipboardWrite() {
	return navigator.clipboard && navigator.clipboard.writeText
}

export function copyToClipboard(content: string) {
	navigator.clipboard.writeText(content)
		.then(() => openToast(m.clipboard_copied()))
		.catch(e => openToast(m.clipboard_error()))
}

export function getMapsUrl(lat: number, lon: number) {
	return `https://maps.google.com?q=${lat},${lon}`
}