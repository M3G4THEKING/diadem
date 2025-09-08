<script lang="ts">
	import Modal from '@/components/ui/modal/Modal.svelte';
	import SliderSteps from '@/components/ui/input/SliderSteps.svelte';
	import SliderRange from '@/components/ui/input/SliderRange.svelte';
	import Button from '@/components/ui/input/Button.svelte';
	import { Car, ChevronRight, Pencil, Plus, X } from 'lucide-svelte';
	import Card from '@/components/ui/Card.svelte';
	import MenuTitle from '@/components/menus/MenuTitle.svelte';
	import AttributesOverview from '@/components/menus/filters/filterset/AttributesOverview.svelte';
	import Attribute from '@/components/menus/filters/filterset/Attribute.svelte';
	import AttributeChip from '@/components/menus/filters/filterset/AttributeChip.svelte';
</script>

<Modal modalType="filtersetPokemon">
	<div class="bg-background rounded-md px-4 py-2 w-128 max-w-full">
		<div class="pb-2 ml-1 pt-1">
			<MenuTitle title="Pokemon Filter" />
		</div>

		<Card class="w-full text-sm divide-y-border divide-y mb-3 py-3 px-4">
			<div class="flex items-center gap-2">
				<b>Filter Title</b>
				<Pencil class="stroke-accent-foreground" size="14" />
			</div>

		</Card>

		<div class="space-y-4">
			<AttributesOverview>
				<Attribute
					label="Species"
				>
					<AttributeChip
						label="3 Pokemon"
						color="yellow"
					/>
				</Attribute>
			</AttributesOverview>
			<AttributesOverview>
				<Attribute
					label="IVs"
				>
					<AttributeChip
						label="97%+"
						color="yellow"
					/>
				</Attribute>
				<Attribute
					label="CP"
				>
					<AttributeChip
						label="50-1500"
						color="yellow"
					/>
				</Attribute>
				<Attribute
					label="Level"
				>
					<AttributeChip
						label="Any"
						color="muted"
					/>
				</Attribute>
			</AttributesOverview>

			<AttributesOverview>
				<Attribute
					label="Little League"
				>
					<AttributeChip
						label="Any"
						color="muted"
					/>
				</Attribute>
				<Attribute
					label="Great League"
				>
					<AttributeChip
						label="Any"
						color="muted"
					/>
				</Attribute>
				<Attribute
					label="Ultra League"
				>
					<AttributeChip
						label="Rank 1-15"
						color="yellow"
					/>
				</Attribute>
			</AttributesOverview>

		</div>

		<div class="flex gap-2 mt-3 justify-end">
			<Button class="" variant="secondary">
				Cancel
			</Button>
			<Button class="" variant="default">
				Save
			</Button>
		</div>

		<!--		<SliderRange title="IV" min={0} max={100} valueMin={0} valueMax={10} />-->
		<!--		<SliderRange title="CP" min={0} max={5000} valueMin={0} valueMax={10} />-->
		<!--		<SliderRange title="Level" min={0} max={50} valueMin={0} valueMax={10} />-->

		<!--		<SliderRange title="Atk IV" min={0} max={15} valueMin={0} valueMax={10} />-->
		<!--		<SliderRange title="Def IV" min={0} max={15} valueMin={0} valueMax={10} />-->
		<!--		<SliderRange title="Sta IV" min={0} max={15} valueMin={0} valueMax={10} />-->
		<!--		<SliderRange title="Little Rank" min={0} max={100} valueMin={0} valueMax={10} />-->
		<!--		<SliderRange title="Great Rank" min={0} max={100} valueMin={0} valueMax={10} />-->
		<!--		<SliderRange title="Ultra Rank" min={0} max={100} valueMin={0} valueMax={10} />-->

		<!--		<div class="flex gap-1 overflow-x-auto">-->
		<!--			{#each ["IV", "CP", "Level", "Atk IV", "Def IV", "Sta IV"] as filter}-->
		<!--				<Button variant="secondary" size="sm">-->
		<!--					<Plus size="16" />-->
		<!--						<span>-->
		<!--					Add {filter} Filter-->
		<!--				</span>-->

		<!--				</Button>-->
		<!--			{/each}-->

		<!--		</div>-->

	</div>
</Modal>
