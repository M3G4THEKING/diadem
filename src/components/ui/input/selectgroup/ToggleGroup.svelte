<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import SelectGroup from '@/components/ui/input/selectgroup/SelectGroup.svelte';

	let {
		childCount = 3,
		class: class_ = '',
		children = undefined,
		evenColumns = true,
		onchange = () => {},
		values = $bindable(),
	}: {
		childCount?: number
		class?: string
		children?: Snippet
		onchange?: (values: string[]) => void
		evenColumns?: boolean,
		values: string[]
	} = $props();
</script>

<SelectGroup
	{childCount}
	{evenColumns}
>
	<ToggleGroup.Root
		bind:value={values}
		onValueChange={onchange}
		type="multiple"
		orientation="horizontal"
		class="select-group w-fit grid gap-4 {class_}"
	>
		{@render children?.()}
	</ToggleGroup.Root>
</SelectGroup>
