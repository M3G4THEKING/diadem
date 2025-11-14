<script lang="ts">
	import FiltersetModal from '@/components/menus/filters/filterset/FiltersetModal.svelte';
	import AttributeChip from '@/components/menus/filters/filterset/AttributeChip.svelte';
	import Attribute from '@/components/menus/filters/filterset/Attribute.svelte';
	import AttributesOverview from '@/components/menus/filters/filterset/AttributesOverview.svelte';
	import PageAttribute from '@/components/menus/filters/filterset/PageAttribute.svelte';
	import SliderRange from '@/components/ui/input/slider/SliderRange.svelte';
	import type { FiltersetPokemon } from '@/lib/features/filters/filtersets';
	import {
		makeAttributePokemonLabel,
		makeAttributeRangeLabel
	} from '@/lib/features/filters/makeAttributeChipLabel';
	import {
		existsCurrentSelectedFilterset,
		getCurrentSelectedFilterset
	} from '@/lib/features/filters/manageFilters.svelte.js';
	import * as m from '@/lib/paraglide/messages';
	import { getGenderLabel, getPokemonSize, pokemonSizes } from '@/lib/utils/pokemonUtils';
	import ToggleGroup from '@/components/ui/input/selectgroup/ToggleGroup.svelte';
	import SelectGroupItem from '@/components/ui/input/selectgroup/SelectGroupItem.svelte';
	import { CircleSmall, Mars, Venus } from 'lucide-svelte';
	import AppearanceAttribute from '@/components/menus/filters/filterset/pokemon/AppearanceAttribute.svelte';
	import { changeAttributeMinMax } from '@/lib/features/filters/filtersetUtils';
	import AppearanceChips from '@/components/menus/filters/filterset/pokemon/AppearanceChips.svelte';
	import IvChips from '@/components/menus/filters/filterset/pokemon/IvChips.svelte';
	import IvAttribute from '@/components/menus/filters/filterset/pokemon/IvAttribute.svelte';
	import SpeciesAttribute from '@/components/menus/filters/filterset/pokemon/SpeciesAttribute.svelte';

	const bounds = {
		ivProduct: {
			min: 0,
			max: 100
		},
		iv: {
			min: 0,
			max: 15
		},
		cp: {
			min: 0,
			max: 5000
		},
		level: {
			min: 0,
			max: 50
		},
		rank: {
			min: 1,
			max: 100
		},
		size: {
			min: 1,
			max: 5
		}
	};

	let data: FiltersetPokemon | undefined = $derived(getCurrentSelectedFilterset()?.data) as | FiltersetPokemon | undefined;
</script>

<FiltersetModal
	modalType="filtersetPokemon"
	modalTitle={existsCurrentSelectedFilterset()
		? m.filterset_title_edit_pokemon()
		: m.filterset_title_new_pokemon()}
	initialPage={!existsCurrentSelectedFilterset() ? "overview" : "new"}
	height={134}
>
	{#snippet overview()}
		{#if data}
			<AttributesOverview>
				<Attribute label={m.species()}>
					<AttributeChip
						label={makeAttributePokemonLabel(data.pokemon ?? [])}
						isEmpty={!data.pokemon}
						onremove={() => delete data.pokemon}
					/>
					{#snippet page(thisData: FiltersetPokemon)}
						<SpeciesAttribute data={thisData} />
					{/snippet}
				</Attribute>
				<Attribute label="Appearance">
					<AppearanceChips {data} sizeBounds={bounds.size} />
					{#snippet page(thisData: FiltersetPokemon)}
						<AppearanceAttribute data={thisData} sizeBounds={bounds.size} />
					{/snippet}
				</Attribute>
			</AttributesOverview>
			<AttributesOverview>
				<Attribute label={m.pogo_ivs()}>
					<IvChips {data} ivBounds={bounds.iv} percBounds={bounds.ivProduct} />
					{#snippet page(thisData: FiltersetPokemon)}
						<IvAttribute data={thisData} ivBounds={bounds.iv} percBounds={bounds.ivProduct} />
					{/snippet}
				</Attribute>
				<Attribute label={m.cp()}>
					<AttributeChip
						label={makeAttributeRangeLabel(data.cp, bounds.cp.min, bounds.cp.max)}
						isEmpty={!data.cp}
						onremove={() => delete data.cp}
					/>
					{#snippet page(thisData: FiltersetPokemon)}
						<SliderRange
							min={bounds.cp.min}
							max={bounds.cp.max}
							title={m.cp()}
							valueMin={thisData.cp?.min ?? bounds.cp.min}
							valueMax={thisData.cp?.max ?? bounds.cp.max}
							onchange={([min, max]) => changeAttributeMinMax(thisData, "cp", bounds.cp.min, bounds.cp.max, min, max)}
						/>
					{/snippet}
				</Attribute>
				<Attribute label={m.level()}>
					<AttributeChip
						label={makeAttributeRangeLabel(data.level, bounds.level.min, bounds.level.max)}
						isEmpty={!data.level}
						onremove={() => delete data.level}
					/>
					{#snippet page(thisData: FiltersetPokemon)}
						<SliderRange
							min={bounds.level.min}
							max={bounds.level.max}
							title={m.level()}
							valueMin={thisData.level?.min ?? bounds.level.min}
							valueMax={thisData.level?.max ?? bounds.level.max}
							onchange={([min, max]) => changeAttributeMinMax(thisData, "level", bounds.level.min, bounds.level.max, min, max)}
						/>
					{/snippet}
				</Attribute>
			</AttributesOverview>

			<AttributesOverview>
				<Attribute label={m.little_league()}>
					<AttributeChip
						label={m.rank_x({
							rank: makeAttributeRangeLabel(data.pvpRankLittle, bounds.rank.min, bounds.rank.max)
						})}
						isEmpty={!data.pvpRankLittle}
						onremove={() => delete data.pvpRankLittle}
					/>
					{#snippet page(thisData: FiltersetPokemon)}
						<SliderRange
							min={bounds.rank.min}
							max={bounds.rank.max}
							title="Little League Rank"
							valueMin={thisData.pvpRankLittle?.min ?? bounds.rank.min}
							valueMax={thisData.pvpRankLittle?.max ?? bounds.rank.max}
							onchange={([min, max]) => changeAttributeMinMax(thisData, "pvpRankLittle", bounds.rank.min, bounds.rank.max, min, max)}
						/>
					{/snippet}
				</Attribute>
				<Attribute label={m.great_league()}>
					<AttributeChip
						label={m.rank_x({
							rank: makeAttributeRangeLabel(data.pvpRankGreat, bounds.rank.min, bounds.rank.max)
						})}
						isEmpty={!data.pvpRankGreat}
						onremove={() => delete data.pvpRankGreat}
					/>
					{#snippet page(thisData: FiltersetPokemon)}
						<SliderRange
							min={bounds.rank.min}
							max={bounds.rank.max}
							title="Great League Rank"
							valueMin={thisData.pvpRankGreat?.min ?? bounds.rank.min}
							valueMax={thisData.pvpRankGreat?.max ?? bounds.rank.max}
							onchange={([min, max]) => changeAttributeMinMax(thisData, "pvpRankGreat", bounds.rank.min, bounds.rank.max, min, max)}
						/>
					{/snippet}
				</Attribute>
				<Attribute label={m.ultra_league()}>
					<AttributeChip
						label={m.rank_x({
							rank: makeAttributeRangeLabel(data.pvpRankUltra, bounds.rank.min, bounds.rank.max)
						})}
						isEmpty={!data.pvpRankUltra}
						onremove={() => delete data.pvpRankUltra}
					/>
					{#snippet page(thisData: FiltersetPokemon)}
						<SliderRange
							min={bounds.rank.min}
							max={bounds.rank.max}
							title="Ultra League Rank"
							valueMin={thisData.pvpRankUltra?.min ?? bounds.rank.min}
							valueMax={thisData.pvpRankUltra?.max ?? bounds.rank.max}
							onchange={([min, max]) => changeAttributeMinMax(thisData, "pvpRankUltra", bounds.rank.min, bounds.rank.max, min, max)}
						/>
					{/snippet}
				</Attribute>
			</AttributesOverview>
		{/if}
	{/snippet}
</FiltersetModal>
