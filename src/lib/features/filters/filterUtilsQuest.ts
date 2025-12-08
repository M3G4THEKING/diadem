import * as m from '@/lib/paraglide/messages';
import type {
	FiltersetQuest,
	QuestReward,
	QuestRewardAmount,
	QuestRewardPokemon
} from "@/lib/features/filters/filtersets";
import { RewardType } from '@/lib/utils/pokestopUtils';

export enum QuestArType {
	AR = "ar",
	NOAR = "noar"
}

export function getRewardFilter(filterset: FiltersetQuest): QuestRewardAmount | QuestRewardPokemon | QuestReward | undefined {
	if (!filterset.rewardType) return
	// @ts-ignore
	return filterset[RewardType[filterset.rewardType].toLowerCase()]
}

export function getAttributeLabelAr(ar: QuestArType | undefined) {
	if (ar === QuestArType.AR) return m.quest_ar_tag();
	if (ar === QuestArType.NOAR) return m.quest_noar_tag();
	return m.both();
}