<script lang="ts">
	import { makeAttributeRangeLabel } from '@/lib/features/filters/makeAttributeChipLabel';
	import * as m from '@/lib/paraglide/messages';
	import AttributeChip from '@/components/menus/filters/filterset/AttributeChip.svelte';
	import type { FiltersetPokemon, MinMax } from '@/lib/features/filters/filtersets';

	let {
		data,
		ivBounds,
		percBounds
	}: {
		data: FiltersetPokemon
		ivBounds: MinMax
		percBounds: MinMax
	} = $props();
</script>

{#if data.iv}
	<AttributeChip
		label={makeAttributeRangeLabel(
			data.iv,
			percBounds.min,
			percBounds.max,
			m.x_percentage({ x: data.iv?.min ?? percBounds.min }),
			m.x_percentage({ x: data.iv?.max ?? percBounds.max })
		)}
		isEmpty={false}
		onremove={() => delete data.iv}
	/>
{/if}
{#if data.ivAtk || data.ivDef || data.ivSta}
	<AttributeChip
		label={makeAttributeRangeLabel(
			{
				min:
					(data.ivAtk?.min ?? ivBounds.min) +
					(data.ivDef?.min ?? ivBounds.min) +
					(data.ivSta?.min ?? ivBounds.min),
				max:
					(data.ivAtk?.max ?? ivBounds.max) +
					(data.ivDef?.max ?? ivBounds.max) +
					(data.ivSta?.max ?? ivBounds.max)
			},
			ivBounds.min * 3,
			ivBounds.max * 3,
			m.atk_def_sta({
				atk: data.ivAtk?.min ?? ivBounds.min,
				def: data.ivDef?.min ?? ivBounds.min,
				sta: data.ivSta?.min ?? ivBounds.min
			}),
			m.atk_def_sta({
				atk: data.ivAtk?.max ?? ivBounds.max,
				def: data.ivDef?.max ?? ivBounds.max,
				sta: data.ivSta?.max ?? ivBounds.max
			})
		)}
		isEmpty={false}
		onremove={() => {
			delete data.ivAtk;
			delete data.ivDef;
			delete data.ivSta;
		}}
	/>
{/if}
{#if !data.iv && !data.ivAtk && !data.ivDef && !data.ivSta}
	<AttributeChip isEmpty={true} />
{/if}