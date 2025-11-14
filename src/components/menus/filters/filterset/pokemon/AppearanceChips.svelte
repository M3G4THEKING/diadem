<script lang="ts">
	import { makeAttributeRangeLabel } from '@/lib/features/filters/makeAttributeChipLabel';
	import { getGenderLabel, getPokemonSize } from '@/lib/utils/pokemonUtils';
	import AttributeChip from '@/components/menus/filters/filterset/AttributeChip.svelte';
	import type { FiltersetPokemon, MinMax } from '@/lib/features/filters/filtersets';

	let {
		data,
		sizeBounds
	}: {
		data: FiltersetPokemon
		sizeBounds: MinMax
	} = $props();
</script>

{#if data.size}
	<AttributeChip
		label={makeAttributeRangeLabel(
			data.size,
			sizeBounds.min,
			sizeBounds.max,
			getPokemonSize(data.size.min ?? sizeBounds.min),
			getPokemonSize(data.size.max ?? sizeBounds.max)
		)}
		isEmpty={false}
		onremove={() => delete data.size}
	/>
{/if}
{#each data.gender ?? [] as gender (gender)}
	<AttributeChip
		label={getGenderLabel(gender)}
		isEmpty={false}
		onremove={() => {
			if ((data.gender?.length ?? 0) > 1) {
				data.gender = data.gender?.filter((g) => g !== gender);
			} else {
				delete data.gender;
			}
		}}
	/>
{/each}
{#if !data.size && !data.gender}
	<AttributeChip isEmpty={true} />
{/if}