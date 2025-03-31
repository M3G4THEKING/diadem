<script lang="ts">
	import type { PokestopData, QuestReward } from '@/lib/types/mapObjectData/pokestop';
	import BasePopup from '@/components/ui/popups/BasePopup.svelte';
	import { getIconInvasion, getIconPokemon, getIconPokestop } from '@/lib/uicons.svelte';
	import ImagePopup from '@/components/ui/popups/ImagePopup.svelte';
	import * as m from "@/lib/paraglide/messages"
	import ImageFort from '@/components/ui/popups/ImageFort.svelte';
	import { ingame } from '@/lib/ingameLocale';
	import Countdown from '@/components/utils/Countdown.svelte';
	import { timestampToLocalTime } from '@/lib/utils.svelte';

	let {data} : {data: PokestopData} = $props()

	function getRewardIcon(questReward: QuestReward) {
		if (questReward.type === 7) return getIconPokemon(questReward.info)

		return getIconPokemon({ pokemon_id: 0 })
	}

	$inspect(data)
</script>

{#snippet questSection(questTitle: string, questRewards: string, quest_target: number, isAr: boolean)}
	{@const reward = JSON.parse(questRewards)[0]}

	<div class="py-2 flex items-center gap-2">
		<span class="text-sm font-semibold border-border border rounded-full px-3 py-1 whitespace-nowrap">
			{#if isAr}
				AR
			{:else}
				No AR
			{/if}
		</span>
		<ImagePopup
			src={getRewardIcon(reward)}
			alt="TBD"
			class="w-7"
		/>
		<span>
			{ingame("quest_title_" + questTitle).replaceAll("%{amount_0}", quest_target)}
		</span>
	</div>
{/snippet}

<BasePopup lat={data.lat} lon={data.lon}>
	{#snippet image()}
		<ImageFort
			alt={data.name ?? m.pogo_pokestop()}
			fortUrl={data.url}
			fortIcon={getIconPokestop(data)}
			fortName={data.name}
		/>
	{/snippet}

	{#snippet title()}
		<div class="text-lg font-semibold tracking-tight">
			<span>
				{#if data.name}
					{data.name}
				{:else}
					{m.unknown_pokestop()}
				{/if}
			</span>
		</div>
	{/snippet}

	{#snippet description()}
		<div class="divide-border divide-y">
			{#if data.quest_target}
				{@render questSection(data.quest_title ?? "", data.quest_rewards ?? "[]", data.quest_target ?? 0, true)}
			{/if}
			{#if data.alternative_quest_target}
				{@render questSection(data.alternative_quest_title ?? "", data.alternative_quest_rewards ?? "[]", data.alternative_quest_target ?? 0, false)}
			{/if}

			{#each data.incident as incident}
				{#if incident.id}
<!--					INCIDENT_DISPLAY_TYPE_NONE = 0;-->
<!--					INCIDENT_DISPLAY_TYPE_INVASION_GRUNT = 1;-->
<!--					INCIDENT_DISPLAY_TYPE_INVASION_LEADER = 2;-->
<!--					INCIDENT_DISPLAY_TYPE_INVASION_GIOVANNI = 3;-->
<!--					INCIDENT_DISPLAY_TYPE_INVASION_GRUNTB = 4;-->
<!--					INCIDENT_DISPLAY_TYPE_INVASION_EVENT_NPC = 5;-->
<!--					INCIDENT_DISPLAY_TYPE_INVASION_ROUTES_NPC = 6;-->
<!--					INCIDENT_DISPLAY_TYPE_INVASION_GENERIC = 7;-->
<!--					INCIDENT_DISPLAY_TYPE_INCIDENT_POKESTOP_ENCOUNTER = 8;-->
<!--					INCIDENT_DISPLAY_TYPE_INCIDENT_CONTEST = 9;-->

					{#if [1, 2, 3].includes(incident.display_type)}
						<!--Team Rocket-->
						<div class="py-2 flex items-center gap-2">
							<ImagePopup
								src={getIconInvasion(incident)}
								alt="TBD"
								class="w-7"
							/>
							<div>
								<div>
									{ingame("grunt_a_" + incident.character)}

									{#if incident.confirmed}
										(confirmed)
									{/if}
								</div>

								<div>
									<span class="font-semibold">
										{timestampToLocalTime(incident.expiration)}
									</span>
									<span class="ml-0.5">
										(<Countdown
											expireTime={incident.expiration}
											showHours={incident.display_type !== 1}
										/>)
									</span>

								</div>

							</div>
						</div>
					{:else if incident.display_type === 8}
						<!--Kecleon-->
						<div class="py-2 flex items-center gap-2">
							<ImagePopup
								src={getIconPokemon({ pokemon_id: 352 })}
								alt={ingame("poke_352")}
								class="w-7"
							/>
							<span>{ingame("poke_352")}</span>
						</div>
					{:else if incident.display_type === 9}
						<!--Contest -->
						<div>
							Contest
						</div>
					{/if}
				{/if}
			{/each}
		</div>

	{/snippet}
</BasePopup>
