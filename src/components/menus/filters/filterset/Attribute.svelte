<script lang="ts">
	import Button from '@/components/ui/input/Button.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let {
		label,
		children = undefined
	}: {
		label: string,
		children?: Snippet
	} = $props()
</script>

<Button variant="ghost" class="rounded-none! grid! grid-cols-subgrid w-full px-4! py-1! h-fit! items-center" style="grid-column: 1 / -1">
	<div class="font-semibold text-left py-2">
		{label}
	</div>

	<div class="ml-1 flex gap-1 overflow-x-hidden">
		{@render children?.()}
	</div>

	<ChevronRight size="18" />
</Button>