<script lang="ts">
	import Card from '@/components/ui/Card.svelte';
	import { ChevronDown, ChevronUp, Eye, EyeOff, FunnelX, Plus } from 'lucide-svelte';
	import MenuGeneric from '@/components/menus/MenuGeneric.svelte';
	import Button from '@/components/ui/input/Button.svelte';
	import FilterControl from '@/components/menus/filters/FilterControl.svelte';

	import { slide } from 'svelte/transition';
	import { hasFeatureAnywhere } from '@/lib/services/user/checkPerm';
	import { getUserDetails } from '@/lib/services/user/userDetails.svelte';
	import type { FeaturesKey } from '@/lib/server/auth/permissions';
	import type { FilterCategory } from '@/lib/features/filters/filters';
	import Switch from '@/components/ui/input/Switch.svelte';
	import { getIconPokemon } from '@/lib/services/uicons.svelte';

	let {
		requiredPermission,
		title,
		category,
		isFilterable = true,
		subCategories = []
	}: {
		requiredPermission: FeaturesKey
		title: string
		category: FilterCategory,
		isFilterable?: boolean
		subCategories?: { title: string, category: FilterCategory }[]
	} = $props();

	let subcategoriesExpanded: boolean = $state(false);
	let isToggled: boolean = $state(false);
</script>

{#if hasFeatureAnywhere(getUserDetails().permissions, requiredPermission)}
	<Card class="py-0 px-2">
		<FilterControl
			{title}
			{category}
			{isFilterable}
			subCategories={subCategories?.map(s => s.category) ?? []}
			bind:expanded={subcategoriesExpanded}
		/>

		{#if subCategories.length > 0}
			{#if subcategoriesExpanded}
				<div class="mb-2" transition:slide={{ duration: 80 }}>
					{#each subCategories as subcategory}
						<FilterControl
							title={subcategory.title}
							category={subcategory.category}
							parentCategory={category}
						/>
					{/each}
				</div>
			{/if}
			<!--			<div class="px-4 mb-0.5">-->
			<!--				<Button class="w-full justify-start!" variant="ghost" onclick={() => subcategoriesExpanded = !subcategoriesExpanded}>-->
			<!--					{#if subcategoriesExpanded}-->
			<!--						<span>Less</span>-->
			<!--						<ChevronUp size="18" />-->
			<!--					{:else}-->
			<!--						<span>Show categories</span>-->
			<!--						<ChevronDown size="18" />-->
			<!--					{/if}-->

			<!--				</Button>-->
			<!--			</div>-->
		{/if}
	</Card>
{/if}