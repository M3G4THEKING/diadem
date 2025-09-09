<script lang="ts">
	import FiltersetModal from '@/components/menus/filters/filterset/FiltersetModal.svelte';
	import AttributeChip from '@/components/menus/filters/filterset/AttributeChip.svelte';
	import Attribute from '@/components/menus/filters/filterset/Attribute.svelte';
	import AttributesOverview from '@/components/menus/filters/filterset/AttributesOverview.svelte';
	import PageAttribute from '@/components/menus/filters/filterset/PageAttribute.svelte';
	import SliderRange from '@/components/ui/input/SliderRange.svelte';

	let {
		isInEdit
	}: {
		isInEdit: boolean;
	} = $props();

</script>

<FiltersetModal
	modalType="filtersetQuest"
	modalTitle="Quest Filter"
	{isInEdit}
	initialPage={isInEdit ? "overview" : "new"}
>
	{#snippet overview()}
		<AttributesOverview>
			<Attribute
				label="AR Quests"
			>
				<div>
					both
				</div>
				{#snippet page()}
					<PageAttribute>
						<div>test</div>
					</PageAttribute>
				{/snippet}
			</Attribute>
		</AttributesOverview>
		<AttributesOverview>
			<Attribute
				label="Pokemon"
			>
				<AttributeChip
					label="Any"
					color="muted"
				/>
				{#snippet page()}
					<PageAttribute>
						<div></div>
					</PageAttribute>
				{/snippet}
			</Attribute>
			<Attribute
				label="Items"
			>
				<AttributeChip
					label="Any"
					color="muted"
				/>
				{#snippet page()}
					<PageAttribute>
						<div></div>
					</PageAttribute>
				{/snippet}
			</Attribute>
			<Attribute
				label="Mega Energy"
			>
				<AttributeChip
					label="Any"
					color="muted"
				/>
				{#snippet page()}
					<PageAttribute>
						<div></div>
					</PageAttribute>
				{/snippet}
			</Attribute>
			<Attribute
				label="Candy XL"
			>
				<AttributeChip
					label="Any"
					color="muted"
				/>
				{#snippet page()}
					<PageAttribute>
						<div></div>
					</PageAttribute>
				{/snippet}
			</Attribute>
			<Attribute
				label="Candy"
			>
				<AttributeChip
					label="Any"
					color="muted"
				/>
				{#snippet page()}
					<PageAttribute>
						<div></div>
					</PageAttribute>
				{/snippet}
			</Attribute>
			<Attribute
				label="Stardust"
			>
				<AttributeChip
					label="Any"
					color="muted"
				/>
				{#snippet page()}
					<PageAttribute>
						<div></div>
					</PageAttribute>
				{/snippet}
			</Attribute>
			<Attribute
				label="XP"
			>
				<AttributeChip
					label="Any"
					color="muted"
				/>
				{#snippet page()}
					<PageAttribute>
						<div></div>
					</PageAttribute>
				{/snippet}
			</Attribute>

		</AttributesOverview>
	{/snippet}
</FiltersetModal>