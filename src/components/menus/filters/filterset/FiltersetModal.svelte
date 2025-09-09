<script lang="ts">
	import Modal from '@/components/ui/modal/Modal.svelte';
	import MenuTitle from '@/components/menus/MenuTitle.svelte';
	import PageNewFilterset from '@/components/menus/filters/filterset/PageNewFilterset.svelte';
	import PageOverview from '@/components/menus/filters/filterset/PageOverview.svelte';
	import PageAttribute from '@/components/menus/filters/filterset/PageAttribute.svelte';
	import {
		type FiltersetPage,
		getCurrentAttributePage,
		getCurrentFiltersetPage, setCurrentFiltersetPage
	} from '@/lib/ui/filtersetPages.svelte';
	import FiltersetButtons from '@/components/menus/filters/filterset/FiltersetButtons.svelte';
	import type { ModalType } from '@/lib/ui/modal.svelte';
	import type { Snippet } from 'svelte';

	let {
		modalType,
		modalTitle,
		overview,
		initialPage,
		isInEdit
	}: {
		modalType: ModalType
		modalTitle: string
		overview: Snippet
		initialPage: FiltersetPage
		isInEdit: boolean
	} = $props();

	function onsave() {
		setCurrentFiltersetPage("new")
	}

	function oncancel() {
		setCurrentFiltersetPage("overview")
	}

	function ondelete() {
		if (!isInEdit) return
	}
</script>

<Modal {modalType}>
	{#snippet title()}
		<div class="pb-2 pl-5 pt-3">
			<MenuTitle title={modalTitle} />
		</div>
	{/snippet}
	<div class="px-4 py-2 w-128 max-w-full h-124 overflow-hidden ">
		<div class="relative h-full">
			{#if getCurrentFiltersetPage() === "new"}
				<PageNewFilterset />
			{:else if getCurrentFiltersetPage() === "overview"}
				<PageOverview {overview} />
			{:else if getCurrentFiltersetPage() === "attribute" && getCurrentAttributePage()}
				<PageAttribute>
					{@render getCurrentAttributePage()?.()}
				</PageAttribute>
			{/if}

			{#if getCurrentFiltersetPage() !== "new"}
				<FiltersetButtons
					showDelete={isInEdit}
					{oncancel}
					{onsave}
					{ondelete}
				/>
			{/if}
		</div>

	</div>
</Modal>
