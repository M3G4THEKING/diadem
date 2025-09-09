<script lang="ts">
	import { Slider } from 'bits-ui';
	import NumberInput from '@/components/ui/input/NumberInput.svelte';
	import Input from '@/components/ui/input/Input.svelte';

	let {
		min,
		max,
		step = 1,
		title,
		onchange = () => {},
		valueMin = $bindable(),
		valueMax = $bindable()
	}: {
		min: number,
		max: number,
		step?: number
		title: string,
		onchange?: (value: number[]) => void,
		valueMin: number,
		valueMax: number,
	} = $props();
</script>

<div class="py-3 px-1">
	<div class="flex w-full mb-3 items-center">
		<span class="font-semibold text-base">
			{title}
		</span>
		<div class="ml-auto border rounded-md py-1 divide-x divide-border flex">
			<div class="px-3 w-14 text-center">
				{valueMin}
			</div>
			<div class="px-3 w-14 text-center">
				{valueMax}
			</div>
		</div>
	</div>


	<Slider.Root
		bind:value={() => [valueMin, valueMax], (v) => {valueMin = v[0]; valueMax = v[1]}}
		type="multiple"
		class="relative flex w-full touch-none select-none items-center"
		{step}
		{min}
		{max}
		onValueChange={onchange}
	>
		{#snippet children({ thumbItems, tickItems })}
		  	<span
				class="relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full bg-accent"
			>
				<Slider.Range class="bg-foreground absolute h-full z-1" />
		  	</span>
			{#each thumbItems as { index } (index)}
				<Slider.Thumb
					{index}
					class="border-border-input bg-background focus-visible:ring-foreground dark:bg-foreground z-5 focus-visible:outline-hidden data-active:scale-90 transition-transform block size-6 cursor-pointer rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				/>
			{/each}
			<!--{#each tickItems as { index, value } (index)}-->
			<!--	&lt;!&ndash;				<Slider.Tick&ndash;&gt;-->
			<!--	&lt;!&ndash;					{index}&ndash;&gt;-->
			<!--	&lt;!&ndash;					class="bg-accent h-4 w-2 rounded-full self-start"&ndash;&gt;-->
			<!--	&lt;!&ndash;				/>&ndash;&gt;-->
			<!--	<Slider.TickLabel-->
			<!--		position="bottom"-->
			<!--		{index}-->
			<!--		class="invisible data-selected:visible text-foreground font-semibold text-sm mt-2 leading-none cursor-pointer"-->
			<!--	>-->
			<!--		{value}-->
			<!--	</Slider.TickLabel>-->
			<!--{/each}-->
		{/snippet}
	</Slider.Root>

<!--	<div class="w-full flex justify-between mt-3">-->
<!--		<Input-->
<!--			class="w-20 text-center"-->
<!--			type="number"-->
<!--			value={valueMin}-->
<!--		/>-->
<!--		<Input-->
<!--			class="w-20 text-center"-->
<!--			type="number"-->
<!--			value={valueMax}-->
<!--		/>-->
<!--	</div>-->
</div>