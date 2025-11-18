<script lang="ts">
	import type { AnyFilterset } from '@/lib/features/filters/filtersets';
	import Input from '@/components/ui/input/Input.svelte';
	import TextInput from '@/components/ui/input/TextInput.svelte';
	import Button from '@/components/ui/input/Button.svelte';
	import MenuTitle from '@/components/menus/MenuTitle.svelte';

	let {
		data
	}: {
		data: AnyFilterset
	} = $props()
	$inspect(data)
</script>

<MenuTitle title="Icon" class="mx-4" />
<div class="flex justify-center">
	<div>

		<Button
			class="rounded-full! size-20! text-4xl! bg-muted ring-border ring-2 ring-offset-4"
			variant="ghost"
		>
			{data.icon}
		</Button>
	</div>
</div>


<TextInput
	title="Name"
	value={data.title}
	onchange={e => data.title = e.target?.value ?? ""}
/>