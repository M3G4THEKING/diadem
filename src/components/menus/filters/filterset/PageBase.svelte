<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getFiltersetPageTransition } from '@/lib/features/filters/filtersetPages.svelte';
	import { getCurrentSelectedFilterset } from '@/lib/features/filters/filtersetPageData.svelte';
	import PokemonAttributeOverview from '@/components/menus/filters/filterset/pokemon/PokemonAttributeOverview.svelte';
	import { filterTitle } from '@/lib/features/filters/filtersetUtils';
	import FiltersetIcon from '@/lib/features/filters/FiltersetIcon.svelte';

	const filterset = getCurrentSelectedFilterset();
</script>

<div
	class="w-full absolute top-0 overflow-y-auto"
	in:fly={getFiltersetPageTransition().in}
	out:fly={getFiltersetPageTransition().out}
>
	<div
		class="flex gap-4 items-center px-2 mt-4"
	>
		<FiltersetIcon filterset={getCurrentSelectedFilterset()?.data} size={8} />
		<span class="text-lg font-semibold">
			{filterTitle(getCurrentSelectedFilterset()?.data)}
		</span>
	</div>

	<div class="flex items-center gap-4 my-3">
		<div class="bg-border h-px w-full"></div>
		<span class="text-muted-foreground text-sm whitespace-nowrap">Attributes</span>
		<div class="bg-border h-px w-full"></div>
	</div>

	{#if filterset?.data}
		{#if filterset.category === "pokemon"}
			<!--@ts-ignore-->
			<PokemonAttributeOverview data={filterset.data} />
		{/if}
	{/if}
</div>