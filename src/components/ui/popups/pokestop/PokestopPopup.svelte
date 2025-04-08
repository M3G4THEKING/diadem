<script lang="ts">
	import type { ContestRankings, PokestopData } from '@/lib/types/mapObjectData/pokestop';
	import BasePopup from '@/components/ui/popups/BasePopup.svelte';
	import {
		getIconContest,
		getIconInvasion,
		getIconItem,
		getIconPokemon,
		getIconPokestop,
		getIconReward,
		getIconType
	} from '@/lib/uicons.svelte.js';
	import ImagePopup from '@/components/ui/popups/common/ImagePopup.svelte';
	import * as m from '@/lib/paraglide/messages';
	import FortImage from '@/components/ui/popups/common/FortImage.svelte';
	import { ingame, pokemonName } from '@/lib/ingameLocale';
	import { currentTimestamp, timestampToLocalTime } from '@/lib/utils.svelte.js';
	import TimeWithCountdown from '@/components/ui/popups/common/TimeWithCountdown.svelte';
	import {
		CONTEST_SLOTS,
		hasFortActiveLure,
		isFortOutdated,
		isIncidentContest,
		isIncidentInvasion,
		isIncidentKecleon
	} from '@/lib/pogoUtils';
	import type { PokemonData } from '@/lib/types/mapObjectData/pokemon';
	import { getCurrentSelectedData, getMapObjects } from '@/lib/mapObjects/mapObjects.svelte.js';
	import UpdatedTimes from '@/components/ui/popups/common/UpdatedTimes.svelte';
	import FortPowerUp from '@/components/ui/popups/common/FortPowerUp.svelte';
	import { getConfig } from '@/lib/config';
	import { ClockAlert, Smartphone, UsersRound } from 'lucide-svelte';
	import IconValue from '@/components/ui/popups/common/IconValue.svelte';
	import type { GymData } from '@/lib/types/mapObjectData/gym';
	import Button from '@/components/ui/Button.svelte';

	let { mapId } : { mapId: string } = $props()
	let data: PokestopData = $derived(getMapObjects()[mapId] as PokestopData ?? getCurrentSelectedData() as PokestopData)

	const defaultContestRankings: ContestRankings = {
		total_entries: 0,
		last_update: 0,
		contest_entries: []
	}
	const contestRankings: ContestRankings = $derived(data?.showcase_rankings ? JSON.parse(data.showcase_rankings) : defaultContestRankings)

	function getTitle() {
		let title = getConfig().general.mapName
		if (data.name) {
			title += " | " + data.name
		} else {
			title += " | " + m.pogo_gym()
		}
		return title
	}

	function getContestImage() {
		if (data.showcase_pokemon_id) {
			return getIconPokemon({ pokemon_id: data.showcase_pokemon_id, form: data.showcase_pokemon_form_id })
		} else if (data.showcase_pokemon_type_id) {
			return getIconType(data.showcase_pokemon_type_id)
		}
		getIconContest()
	}

	function getContestName() {
		let name = ""
		if (data.showcase_ranking_standard === 1) {
			name += "Smallest "
		} else {
			name += "Biggest "
		}

		if (data.showcase_pokemon_id) {
			name += pokemonName({ pokemon_id: data.showcase_pokemon_id, form: data.showcase_pokemon_form_id })
		} else if (data.showcase_pokemon_type_id) {
			name += ingame("poke_type_" + data.showcase_pokemon_type_id)
		}

		return name
	}
</script>

<svelte:head>
	<title>{getTitle()}</title>
</svelte:head>

{#snippet questSection(expanded: boolean, questTitle: string, questRewards: string, quest_target: number, questTimestamp: number, isAr: boolean)}
	{@const reward = JSON.parse(questRewards)[0]}

	<div class="py-2 flex items-center gap-2 border-border border-b group-last:mb-2">
		<div class="w-7 h-7 flex-shrink-0">
			<ImagePopup
				src={getIconReward(reward)}
				alt="TBD"
				class="w-7 h-7"
			/>
		</div>
		<div>
			<span class="text-sm font-semibold border-border border rounded-full px-3 mr-1 py-1 whitespace-nowrap">
				{#if isAr}
					{m.quest_ar_tag()}
				{:else}
					{m.quest_noar_tag()}
				{/if}
			</span>
			<span>
				{ingame("quest_title_" + questTitle).replaceAll("%{amount_0}", quest_target)}
			</span>
			{#if expanded}
				<div>
					Found <b>{timestampToLocalTime(questTimestamp, true)}</b>
				</div>
			{/if}
		</div>

	</div>
{/snippet}

{#snippet lureSection()}
	{#if hasFortActiveLure(data)}
		<div class="py-2 flex items-center gap-2 border-border border-b group-last:mb-2">
			<div class="w-7 h-7 flex-shrink-0">
				<ImagePopup
					src={getIconItem(data.lure_id)}
					alt="TBD"
					class="w-7"
				/>
			</div>
			<div>
				<span>
					{ingame("item_" + data.lure_id)}
				</span>
				<TimeWithCountdown
					expireTime={data.lure_expire_timestamp}
					showHours={false}
				/>
				<!--TODO: show verified lure time-->
			</div>
		</div>
	{/if}
{/snippet}

{#snippet incidentSection(expanded: boolean)}
	{#each data.incident as incident}
		{#if incident.id && incident.expiration > currentTimestamp()}
			{#if isIncidentInvasion(incident)}
				<div class="py-2 flex items-center gap-2 border-border border-b">
					<div class="w-7 h-7 flex-shrink-0">
						<ImagePopup
							src={getIconInvasion(incident)}
							alt="TBD"
							class="w-7"
						/>
					</div>

					<div>
						<span>
							{ingame("grunt_a_" + incident.character)}

							{#if incident.confirmed}
								({m.confirmed()})
							{/if}
						</span>

						<TimeWithCountdown
							expireTime={incident.expiration}
							showHours={incident.display_type !== 1}
						/>
					</div>
				</div>
			{:else if isIncidentKecleon(incident)}
				<div class="py-2 flex items-center gap-2 border-border border-b group-last:mb-2">
					<div class="w-7 h-7 flex-shrink-0">
						<ImagePopup
							src={getIconPokemon({ pokemon_id: 352 })}
							alt={pokemonName({ pokemon_id: 352 })}
							class="w-7"
						/>
					</div>
					<div>
						<span class="mr-1">
							{pokemonName({ pokemon_id: 352 })}
						</span>
						<TimeWithCountdown
							expireTime={incident.expiration}
							showHours={false}
						/>
					</div>
				</div>
			{:else if isIncidentContest(incident)}
				<div class="py-2 border-border border-b group-last:mb-2">
				<div class="flex items-center gap-2">
					<div class="w-7 h-7 flex-shrink-0">
						<ImagePopup
							src={getContestImage()}
							alt={getContestName()}
							class="w-7"
						/>
					</div>
					<div>
						<div>
							Showcase:
							<b>{getContestName()}</b>
						</div>

						<div>
							Ends
							<TimeWithCountdown
								expireTime={data.showcase_expiry}
								showHours={true}
							/>
						</div>
					</div>
				</div>

				{#if expanded}
					<div class="mt-2">
						<IconValue Icon={UsersRound}>
							Entries: <b>{contestRankings.total_entries}</b>/{CONTEST_SLOTS}
						</IconValue>
					</div>
					{#each contestRankings.contest_entries as entry}
						<div class="flex gap-1 items-center">
							<div class="rounded-full w-4 h-4  flex items-center justify-center">
								<span>{entry.rank}.</span>
							</div>
							<div class="w-5 flex-shrink-0">
								<ImagePopup
									src={getIconPokemon(entry)}
									alt={pokemonName(entry)}
									class="w-5"
								/>
							</div>
							<div>
								<b>{pokemonName(entry)}</b>
								(Score: {entry.score.toFixed(0)})
							</div>
						</div>
					{/each}
				{/if}
				</div>
			{/if}
		{/if}
	{/each}
{/snippet}

<BasePopup lat={data.lat} lon={data.lon}>
	{#snippet image()}
		<FortImage
			alt={data.name ?? m.pogo_pokestop()}
			fortUrl={data.url}
			fortIcon={getIconPokestop(data)}
			fortName={data.name}
			fortDescription={data.description}
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
		<div class="[&>*:last-child]:border-none [&>*:last-child]:pb-0">
			{#if data.quest_target}
				{@render questSection(false, data.quest_title ?? "", data.quest_rewards ?? "[]", data.quest_target ?? 0, data.quest_timestamp ?? 0, true)}
			{/if}
			{#if data.alternative_quest_target}
				{@render questSection(false, data.alternative_quest_title ?? "", data.alternative_quest_rewards ?? "[]", data.alternative_quest_target ?? 0, data.alternative_quest_timestamp ?? 0, false)}
			{/if}

			{@render lureSection()}
			{@render incidentSection(false)}
		</div>

		{#if isFortOutdated(data.updated)}
			<IconValue Icon={ClockAlert}>
				{m.outdated_message()}
			</IconValue>
		{/if}
	{/snippet}

	{#snippet content()}
		<div class="[&>*:last-child]:mb-2">
			{#if data.quest_target}
				{@render questSection(true, data.quest_title ?? "", data.quest_rewards ?? "[]", data.quest_target ?? 0, data.quest_timestamp ?? 0, true)}
			{/if}
			{#if data.alternative_quest_target}
				{@render questSection(true, data.alternative_quest_title ?? "", data.alternative_quest_rewards ?? "[]", data.alternative_quest_target ?? 0, data.alternative_quest_timestamp ?? 0, false)}
			{/if}

			{@render lureSection()}
			{@render incidentSection(true)}
		</div>

		<div class="[&>*:last-child]:mb-3">
			{#if data.ar_scan_eligible}
				<IconValue Icon={Smartphone}>
					{m.ar_scannable()}
				</IconValue>
			{/if}

			<FortPowerUp
				points={data.power_up_points}
				level={data.power_up_level}
				endTimestamp={data.power_up_end_timestamp}
				updated={data.updated}
			/>
		</div>

		<UpdatedTimes
			updated={data.updated}
			lastModified={data.last_modified_timestamp}
			firstSeen={data.first_seen_timestamp}
		/>
	{/snippet}
</BasePopup>
