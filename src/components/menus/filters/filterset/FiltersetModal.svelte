<script lang="ts">
	import Modal from '@/components/ui/modal/Modal.svelte';
	import MenuTitle from '@/components/menus/MenuTitle.svelte';
	import PageNewFilterset from '@/components/menus/filters/filterset/PageNewFilterset.svelte';
	import PageOverview from '@/components/menus/filters/filterset/PageOverview.svelte';
	import PageAttribute from '@/components/menus/filters/filterset/PageAttribute.svelte';
	import {
		type FiltersetPage,
		filtersetPageClose,
		filtersetPageSave,
		getCurrentAttributePage,
		getCurrentFiltersetPage
	} from '@/lib/features/filters/filtersetPages.svelte.js';
	import FiltersetButtons from '@/components/menus/filters/filterset/FiltersetButtons.svelte';
	import { closeModal, type ModalType } from '@/lib/ui/modal.svelte';
	import { onDestroy, type Snippet } from 'svelte';
	import Button from '@/components/ui/input/Button.svelte';
	import {
		existsCurrentSelectedFilterset, getCurrentSelectedFilterset,
		resetCurrentSelectedFilterset
	} from '@/lib/features/filters/manageFilters.svelte';
	import PageBase from '@/components/menus/filters/filterset/PageBase.svelte';

	let {
		modalType,
		modalTitle,
		overview,
		initialPage,
		height = 130
	}: {
		modalType: ModalType
		modalTitle: string
		overview: Snippet
		initialPage: FiltersetPage
		height?: number
	} = $props();

	function onopenchange(opened: boolean) {
		if (!opened) resetCurrentSelectedFilterset()
	}

	function onsave() {
		filtersetPageSave(modalType)
	}

	function oncancel() {
		filtersetPageClose(modalType);
	}

	function ondelete() {
		if (!existsCurrentSelectedFilterset()) return;
	}
</script>

<Modal {modalType} {onopenchange} class="max-h-screen">
	{#snippet title()}
		<p class="pb-2 pl-5 pt-3 font-semibold text-base">
			<span>
				{modalTitle}
			</span>
			{#if getCurrentAttributePage().label && getCurrentFiltersetPage() === "attribute"}
				<span class="font-normal">
					/ {getCurrentAttributePage().label}
				</span>
			{/if}
		</p>
	{/snippet}
	<div
		class="px-4 py-2 w-128 max-w-full overflow-hidden"
		style:height="min(calc(100vh - 4rem), {height / 4}rem)"
	>
		<div class="relative h-full">
			{#if getCurrentFiltersetPage() === "new"}
				<PageNewFilterset />
			{:else if getCurrentFiltersetPage() === "base"}
				<PageBase />
			{:else if getCurrentFiltersetPage() === "overview"}
				<PageOverview {overview} />
			{:else if getCurrentFiltersetPage() === "attribute" && getCurrentAttributePage().snippet}
				<PageAttribute />
			{/if}

			{#if getCurrentFiltersetPage() !== "new"}
				<FiltersetButtons
					showDelete={existsCurrentSelectedFilterset()}
					{oncancel}
					{onsave}
					{ondelete}
				/>
			{/if}
		</div>

	</div>
</Modal>
