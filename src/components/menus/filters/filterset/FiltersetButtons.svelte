<script lang="ts">
	import Button from '@/components/ui/input/Button.svelte';
	import { Trash } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let {
		showDelete,
		oncancel = () => {},
		onsave = () => {},
		ondelete = () => {}
	}: {
		showDelete: boolean;
		oncancel?: () => void;
		onsave?: () => void;
		ondelete?: () => void;
	} = $props()
</script>

<div
	class="flex gap-2 mt-3 justify-end absolute bottom-0 w-full"
	transition:fly={{duration: 100, y: 80}}
>
	{#if showDelete}
		<Button class="mr-auto" variant="destructive" onclick={ondelete}>
			<Trash size="16" />
			<span>
				Delete
			</span>
		</Button>
	{/if}
	<Button class="" variant="secondary" onclick={oncancel}>
		Cancel
	</Button>
	<Button class="" variant="default" onclick={onsave}>
		Save
	</Button>
</div>