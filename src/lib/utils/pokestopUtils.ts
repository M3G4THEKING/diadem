import type {
	ContestFocus,
	Incident,
	PokestopData,
	QuestReward
} from "@/lib/types/mapObjectData/pokestop";
import { mAlignment, mGeneration, mItem, mPokemon, mType } from "@/lib/services/ingameLocale";
import * as m from "@/lib/paraglide/messages";
import { currentTimestamp } from "@/lib/utils/currentTimestamp";
import { getUserSettings } from '@/lib/services/userSettings.svelte';

export const CONTEST_SLOTS = 200;
export const INCIDENT_DISPLAY_GOLD = 7
export const INCIDENT_DISPLAY_KECLEON = 8
export const INCIDENT_DISPLAY_CONTEST = 9
export const INCIDENT_DISPLAYS_INVASION = [1, 2, 3]

export function parseQuestReward(reward?: string | null) {
	return JSON.parse(reward ?? "[]")[0] as QuestReward | undefined;
}

export function getArTag(isAr: boolean) {
	if (isAr) return m.quest_ar_tag();
	return m.quest_noar_tag();
}

export function hasFortActiveLure(data: Partial<PokestopData>) {
	return (
		data.lure_id && data.lure_expire_timestamp && data.lure_expire_timestamp > currentTimestamp()
	);
}

export function isIncidentInvasion(incident: Incident) {
	return INCIDENT_DISPLAYS_INVASION.includes(incident.display_type);
}

export function isIncidentGold(incident: Incident) {
	return incident.display_type === INCIDENT_DISPLAY_GOLD
}

export function isIncidentKecleon(incident: Incident) {
	return incident.display_type === INCIDENT_DISPLAY_KECLEON;
}

export function isIncidentContest(incident: Incident) {
	return incident.display_type === INCIDENT_DISPLAY_CONTEST;
}

export function getRewardText(reward: QuestReward) {
	switch (reward.type) {
		case 1:
			return m.quest_xp({ count: reward.info.amount });
		case 2:
			return m.quest_item({ count: reward.info.amount, item: mItem(reward.info.item_id) });
		case 3:
			return m.quest_stardust({ count: reward.info.amount });
		case 4:
			return m.quest_candy({ count: reward.info.amount, pokemon: mPokemon(reward.info) });
		case 5:
			return "Avatar Clothing";
		case 6:
			return "Quest";
		case 7:
			return mPokemon(reward.info);
		case 8:
			return "Pokecoins";
		case 9:
			return m.quest_xl_candy({
				count: reward.info.amount,
				pokemon: mPokemon(reward.info)
			});
		case 10:
			return "Level Cap";
		case 11:
			return "Sticker";
		case 12:
			return m.quest_mega_resource({
				count: reward.info.amount,
				pokemon: mPokemon(reward.info)
			});
		case 13:
			return "Incdent";
		case 14:
			return "Player Attribute";
		default:
			return "";
	}
}

export function getContestText(data: PokestopData) {
	let metric = m.contest_biggest
	let name = ""

	if ((data?.showcase_expiry ?? 0) < currentTimestamp()) {
		return m.unknown_contest()
	}

	if (data.showcase_ranking_standard === 1) {
		metric = m.contest_smallest
	}

	const focus: ContestFocus = JSON.parse(data.showcase_focus ?? "{}")

	if (!focus) return metric({ name })

	if (focus.type === "pokemon") {
		name = mPokemon({ pokemon_id: focus.pokemon_id, form: focus.pokemon_form })
	} else if (focus.type === "type") {
		if (focus.pokemon_type_2) {
			name = m.connected_and({
				1: mType(focus.pokemon_type_1),
				2:  m.x_type({ type: mType(focus.pokemon_type_2) })
			})
		} else {
			name = m.x_type({ type: mType(focus.pokemon_type_1) })
		}
	} else if (focus.type === "buddy") {
		name = m.contest_buddy_min_level({ level: focus.min_level })
	} else if (focus.type === "alignment") {
		name = mAlignment(focus.pokemon_alignment)
	} else if (focus.type === "class") {
		// @ts-ignore
		const func =  m["pokemon_class_" + focus.pokemon_class]
		name = func ? func() : "?"
	} else if (focus.type === "family") {
		name = m.contest_pokemon_family({ pokemon: mPokemon({ pokemon_id: focus.pokemon_family }) })
	} else if (focus.type === "generation") {
		name = mGeneration(focus.generation) + " " + m.pogo_pokemon()
	} else if (focus.type === "hatched") {
		name = focus.hatched ? m.contest_hatched() : m.contest_not_hatched()
	} else if (focus.type === "mega") {
		name = focus.restriction === 1 ? m.contest_mega_evolution() : m.contest_not_mega_evolution()
	} else if (focus.type === "shiny") {
		name = focus.shiny ? m.contest_shiny() : m.contest_not_shiny()
	}

	return metric({ name })
}

export function shouldDisplayIncidient(incident: Incident) {
	const pokestopFilters = getUserSettings().filters.pokestopMajor
	if (!pokestopFilters.enabled) return false

	if (pokestopFilters.goldPokestop.enabled && isIncidentGold(incident)) return true
	if (pokestopFilters.contest.enabled && isIncidentContest(incident)) return true
	if (pokestopFilters.kecleon.enabled && isIncidentKecleon(incident)) return true

	if (pokestopFilters.invasion.enabled && isIncidentInvasion(incident)) {
		const invasionFilters = pokestopFilters.invasion.filters.filter(f => f.enabled)
		if (invasionFilters.length === 0) return true
		// TODO invasion filter display filters
	}

	return false
}

export function shouldDisplayQuest(reward: QuestReward) {
	const pokestopFilters = getUserSettings().filters.pokestopMajor
	if (!pokestopFilters.enabled || !pokestopFilters.quest.enabled) return false

	// TODO quest display filters

	return true
}

export function shouldDisplayLure(data: Partial<PokestopData>) {
	if (!hasFortActiveLure(data)) return false
	const pokestopFilters = getUserSettings().filters.pokestopMajor
	if (!pokestopFilters.enabled || !pokestopFilters.lure.enabled) return false

	const lureFilters = pokestopFilters.lure.filters.filter(f => f.enabled)
	if (lureFilters.length === 0) return true
	return lureFilters.some(f => f.items.includes(data?.lure_id ?? 0))
}