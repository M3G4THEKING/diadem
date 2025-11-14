<script lang="ts">
	import { changeAttributeMinMax } from '@/lib/features/filters/filtersetUtils';
	import SliderRange from '@/components/ui/input/slider/SliderRange.svelte';
	import type { FiltersetPokemon, MinMax } from '@/lib/features/filters/filtersets';
	import { getSpawnablePokemon } from '@/lib/services/masterfile';
	import { getIconPokemon } from '@/lib/services/uicons.svelte';
	import { mPokemon } from '@/lib/services/ingameLocale';
	import Button from '@/components/ui/input/Button.svelte';
	import { ToggleGroup } from 'bits-ui';

	let {
		data,
	}: {
		data: FiltersetPokemon
	} = $props();

	function pokemonValue(pokemon: { pokemon_id: number, form: number }) {
		return `${pokemon.pokemon_id}-${pokemon.form}`
	}

	let selected = $derived(data.pokemon?.map(p => pokemonValue(p)) ?? [])
	$inspect(selected)
</script>

<div class="overflow-y-auto h-118 flex flex-wrap">
	{#each getSpawnablePokemon() as pokemon}
		<button
			class="size-10 p-1 cursor-pointer hover:bg-accent"
			data-pokemon-id={pokemon.pokemon_id}
			data-form-id={pokemon.form}
			class:bg-sky-100={selected.includes(pokemonValue(pokemon))}
			onclick={() => {
				if (selected.includes(pokemonValue(pokemon))) {
					console.log(data.pokemon)
					console.log(pokemon)
					data.pokemon = data.pokemon?.filter(p => p.pokemon_id !== pokemon.pokemon_id || p.form !== pokemon.form)
					console.log(data.pokemon)
				} else {
					if (!data.pokemon) data.pokemon = []
					data.pokemon.push(pokemon)
				}

				if (data.pokemon?.length === 0) delete data.pokemon
			}}
		>
		<img
			alt={mPokemon(pokemon)}
			src={getIconPokemon(pokemon)}
			loading="lazy"
		>
		</button>
	{/each}
</div>
