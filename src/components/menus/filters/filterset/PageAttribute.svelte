<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children: Snippet
	} = $props()
</script>


<div
	class="w-full absolute top-0 h-full pb-20"
	transition:fly={{duration: 100, x: 80}}
>
	{@render children()}
</div>