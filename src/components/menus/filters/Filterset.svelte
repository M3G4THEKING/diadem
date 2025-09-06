<script lang="ts">
	import Button from '@/components/ui/input/Button.svelte';
	import Switch from '@/components/ui/input/Switch.svelte';
	import { Eye, Pencil } from 'lucide-svelte';

	import type { AnyFilterst } from '@/lib/features/filters/filtersets';

	let {
		filter
	}: {
		filter: AnyFilterst
	} = $props()
</script>

<div class="flex items-center text-sm border rounded-md gap-1">
	<div class="flex-1 flex gap-1 items-center justify-start rounded-md py-2 h-12 m-0! pl-4 pr-2" size="" variant="ghost">
		<span>{filter.icon}</span>
		<span>{filter.title}</span>
	</div>
<!--	<Button class="flex-1 justify-start rounded-md py-2 h-12 m-0! pl-4 pr-2" size="" variant="ghost">-->
<!--		<span>{filter.icon}</span>-->
<!--		<span>{filter.title}</span>-->
<!--	</Button>-->

	<Button class="ml-auto my-0!" variant="outline" size="icon">
		<Pencil size="16" />
	</Button>

	<Button class="ml-auto my-0! mr-1" variant="outline" size="icon">
		<Eye size="16" />
	</Button>
</div>