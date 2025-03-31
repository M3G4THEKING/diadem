import { createI18n } from "@inlang/paraglide-sveltekit"
import * as runtime from "@/lib/paraglide/runtime.js"
import { availableLanguageTags } from '@/lib/paraglide/runtime.js';

export const i18n = createI18n(runtime, { exclude: [/.*/] })

export function resolveLanguageTag(userSettingsLanguageTag: string) {
	if (userSettingsLanguageTag === "auto") {
		const browserTag = window.navigator.language.toLowerCase().split("-")[0]
		return availableLanguageTags.find(l => l === browserTag) ?? "en"
	}

	return userSettingsLanguageTag
}