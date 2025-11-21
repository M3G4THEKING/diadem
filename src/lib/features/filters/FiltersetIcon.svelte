<script lang="ts">
	import type { AnyFilterset } from '@/lib/features/filters/filtersets';
	import * as m from '@/lib/paraglide/messages';
	import { filterTitle } from '@/lib/features/filters/filtersetUtils';
	import { getIcon } from '@/lib/features/filters/icons';
	import { hasLoadedFeature, LoadedFeature } from '@/lib/services/initialLoad.svelte';

	let {
		filterset,
		size
	}: {
		filterset: AnyFilterset | undefined,
		size: number
	} = $props();

	let rem = $derived(size / 4);
</script>

<div
	class="flex items-center justify-center"
	style:height="{rem}rem"
	style:width="{rem}rem"
>
	{#if filterset?.icon?.uicon}
		{#if hasLoadedFeature(LoadedFeature.ICON_SETS)}
			<img
				src={getIcon(filterset.icon.uicon.category, filterset.icon.uicon.params)}
				alt={filterTitle(filterset)}
				class="size-full"
			>
		{/if}
	{:else if filterset?.icon?.emoji}
		<span
			style:font-size="{rem}rem"
		>
			{filterset.icon.emoji}
		</span>
	{/if}
</div>

