<script lang="ts">
	import { fly } from 'svelte/transition';
	import { isFilterPageTransitionReverse } from '@/lib/features/filters/filtersetPages.svelte';


</script>

<div
	class="w-full absolute top-0 h-[calc(100%-3rem)] overflow-y-auto"
	transition:fly={{duration: 100, x: 80}}
>
	base
</div>