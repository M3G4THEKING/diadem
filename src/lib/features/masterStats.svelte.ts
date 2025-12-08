
import type { MasterStats, PokemonStatEntry, TotalPokemonStats } from "@/lib/server/api/queryStats";
import { getQuestKey, RewardType } from "@/lib/utils/pokestopUtils";
import type { QuestReward } from '@/lib/types/mapObjectData/pokestop';
import type { FiltersetQuest } from '@/lib/features/filters/filtersets';
import { getRewardFilter } from '@/lib/features/filters/filterUtilsQuest';

let masterStats: MasterStats | undefined = undefined;

export type PokemonStats = {
	total: TotalPokemonStats;
	entry: PokemonStatEntry | undefined;
};

export async function loadMasterStats() {
	const response = await fetch("/api/stats");

	if (!response.ok) {
		console.error("Stat fetching failed!")
	}

	masterStats = await response.json();
}

export function getPokemonStats(pokemonId: number, formId: number): PokemonStats | undefined {
	if (!masterStats) return undefined
	const key = `${pokemonId}-${formId}`;

	return {
		total: masterStats.totalPokemon,
		entry: masterStats.pokemon[key]
	}
}

export function getQuestStats(questReward: string, questTitle: string, questTarget: number) {
	if (!masterStats) return undefined
	const entry = masterStats.quests[getQuestKey(questReward, questTitle, questTarget)]

	return {
		total: masterStats.totalQuests,
		entry
	}
}

export function getQuestRewardsForTask(title: string, target: number) {
	if (!masterStats) return []
	return Object.values(masterStats.quests)
		.filter(q => q.title === title && q.target === target)
		.map(q => q.reward)
}

export function getQuestTasksForReward(filterset: FiltersetQuest) {
	if (!masterStats) return []
	const rewardFilter = getRewardFilter(filterset)
	if (!rewardFilter) return []


}