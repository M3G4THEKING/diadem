<script lang="ts">
	import { ChevronDown, FunnelX, Plus } from 'lucide-svelte';
	import type {
		AnyFilter,
		FilterCategory,
		FilterPokemon,
		FilterType
	} from '@/lib/features/filters/filters';
	import { getUserSettings, updateUserSettings } from '@/lib/services/userSettings.svelte.js';
	import { updateAllMapObjects } from '@/lib/mapObjects/updateMapObject';
	import Switch from '@/components/ui/input/Switch.svelte';
	import MenuTitle from '@/components/menus/MenuTitle.svelte';
	import Button from '@/components/ui/input/Button.svelte';
	import { getIconPokemon } from '@/lib/services/uicons.svelte';

	import { slide } from 'svelte/transition';
	import Filterset from '@/components/menus/filters/Filterset.svelte';
	import { watch } from 'runed';
	import type { FiltersetPokemon } from '@/lib/features/filters/filtersets';

	let {
		category,
		title,
		isFilterable = true,
		subCategories = [],
		parentCategory = undefined,
		expanded = $bindable(false)
	}: {
		category: FilterCategory,
		title: string,
		isFilterable?: boolean,
		subCategories?: FilterCategory[],
		parentCategory?: FilterCategory | undefined,
		expanded?: boolean
	} = $props();

	let filter: AnyFilter = $derived(getUserSettings().filters[category]);
	let isEnabled: boolean = $derived(filter.enabled);
	let hasAnyFilterset: boolean = $derived((filter?.filters?.length ?? 0) > 0);

	function onEnabledChange(value: boolean) {
		filter.type = value ? 'all' : 'none';

		subCategories.forEach(subcategory => {
			getUserSettings().filters[subcategory].enabled = value;
		});
		if (parentCategory && value) {
			getUserSettings().filters[parentCategory].enabled = value;
		}
		// TODO uncheck parent if all children are unchecked

		updateUserSettings();
		updateAllMapObjects().then();
	}

	function placeholderAddFilter() {
		if (category !== 'pokemonMajor') return;
		const newFilter: FiltersetPokemon = {
			id: '1',
			title: '100% IV',
			icon: '💯',
			enabled: true,
			iv: { min: 100, max: 100}
		};
		filter.filters = [newFilter];
		updateUserSettings();
		updateAllMapObjects().then();
	}
</script>

<div
	class="py-2 pr-4 pl-0"
>
	<div class="flex gap-2 justify-between items-center">
		{#if subCategories.length === 0}
			<div class="pl-4 py-2">
				<MenuTitle {title} />
			</div>

		{:else}
			<Button class="flex items-center justify-start! gap-1 flex-1"
					variant="ghost"
					onclick={() => expanded = !expanded}>
				<MenuTitle {title} />
				<ChevronDown size="20" />
			</Button>
		{/if}

		<Switch bind:checked={isEnabled} onCheckedChange={onEnabledChange} />
	</div>

	{#if isEnabled && isFilterable}
		<div
			class="w-full flex flex-col gap-1 pl-2"
			transition:slide={{ duration: 90 }}
			class:mt-2={hasAnyFilterset}
		>
			{#each filter.filters ?? [] as filterset (filterset.id)}
				<Filterset filter={filterset} />
			{/each}
			<div class="flex" class:mb-0.5={hasAnyFilterset}>
				{#if hasAnyFilterset}
					<Button class="w-full" variant="ghost" size="sm">
						<FunnelX size="16" />
						<span>Ignore filters</span>
					</Button>
				{/if}
				<Button class="w-full" variant="ghost" size="sm" onclick={placeholderAddFilter}>
					<Plus size="16" />
					<span>Add filter</span>
				</Button>
			</div>
		</div>
	{/if}
</div>

<!--<div-->
<!--	class="py-2 pr-4 pl-0 w-full flex gap-2 justify-between"-->
<!--	class:flex-col={showFiltered}-->
<!--	class:pl-4={showFiltered}-->
<!--	class:items-center={!showFiltered}-->
<!--&gt;-->
<!--	{#if showFiltered}-->
<!--		<MenuTitle {title} />-->
<!--	{:else}-->
<!--		<Button class="flex items-center justify-start! gap-1 flex-1" variant="ghost" onclick={() => expanded = !expanded}>-->
<!--			<MenuTitle {title} />-->

<!--			<ChevronDown size="20" />-->
<!--		</Button>-->
<!--	{/if}-->


<!--	{#if showFiltered}-->
<!--		<RadioGroup-->
<!--			class="gap-3! w-full"-->
<!--			value={getUserSettings().filters[category].type}-->
<!--			childCount={showFiltered ? 3 : 2}-->
<!--			{onValueChange}-->
<!--		>-->
<!--			<RadioGroupItem value="all" class="py-2">-->
<!--				<Eye size="16" />-->
<!--				<span>-->
<!--			{#if showFiltered}-->
<!--				All-->
<!--			{:else}-->
<!--				Show-->
<!--			{/if}-->
<!--		</span>-->
<!--			</RadioGroupItem>-->
<!--			<RadioGroupItem value="none" class="py-2">-->
<!--				<EyeOff size="16" />-->
<!--				<span>-->
<!--			{#if showFiltered}-->
<!--				None-->
<!--			{:else}-->
<!--				Hide-->
<!--			{/if}-->
<!--		</span>-->
<!--			</RadioGroupItem>-->
<!--			{#if showFiltered}-->
<!--				<RadioGroupItem value="filtered" class="py-2">-->
<!--					<Funnel size="16" />-->
<!--					<span>Filtered</span>-->
<!--				</RadioGroupItem>-->
<!--			{/if}-->
<!--		</RadioGroup>-->

<!--	{:else}-->

<!--		<Switch />-->


<!--	{/if}-->
<!--</div>-->