<script lang="ts">
	import Button from '@/components/ui/input/Button.svelte';
	import { X } from 'lucide-svelte';

	let {
		label,
		color
	}: {
		label: string,
		color: 'yellow' | 'muted'
	} = $props();

	const colors = {
		muted: {
			text: '--color-slate-500',
			bg: '--color-slate-100',
			border: '--color-slate-200'
		},
		yellow: {
			text: '--color-amber-900',
			bg: '--color-amber-100',
			border: '--color-amber-200'
		}
	};
</script>

<div
	class="pl-2 rounded-sm  border w-fit flex items-stretch attribute-chip"
	class:pr-2={color === "muted"}
	style="--color-attr-chip-border: var({colors[color].border}); --color-attr-chip-bg: var({colors[color].bg}); --color-attr-chip-text: var({colors[color].text});"
>
	<span class="py-1">
		{label}
	</span>
	{#if color !== "muted"}
		<Button
			class="h-auto! w-auto! px-2! p-0! attribute-chip-button"
			variant=""
			size="icon"
			style=""
		>
			<X size="14" />
		</Button>
	{/if}
</div>

<style>
    .attribute-chip {
        background-color: var(--color-attr-chip-bg);
        color: var(--color-attr-chip-text);
        border-color: var(--color-attr-chip-border);
    }

    :global(.attribute-chip-button:hover), :global(.attribute-chip-button:active) {
        background-color: color-mix(in oklab, var(--color-attr-chip-border) 50%, transparent);
    }
</style>