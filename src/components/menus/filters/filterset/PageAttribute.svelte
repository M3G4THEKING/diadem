<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import {
		getCurrentSelectedAttribute,
		resetCurrentSelectedAttribute,
		setCurrentSelectedAttribute
	} from '@/lib/features/filters/manageFilters.svelte';
	import { getCurrentAttributePage } from '@/lib/features/filters/filtersetPages.svelte.js';

	onMount(() => {
		setCurrentSelectedAttribute()
	})

	onDestroy(() => {
		resetCurrentSelectedAttribute()
	})
</script>


<div
	class="w-full absolute top-0 h-full pb-20"
	transition:fly={{duration: 100, x: 80}}
>
	{#if getCurrentSelectedAttribute()}
		{@render getCurrentAttributePage().snippet?.(getCurrentSelectedAttribute())}
	{/if}
</div>