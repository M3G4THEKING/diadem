<script lang="ts">
	import BaseFab from '@/components/ui/fab/BaseFab.svelte';
	import Search from '@/components/ui/search/Search.svelte';
	import { Search as SearchIcon } from 'lucide-svelte';
	import { closeModal, openModal } from '@/lib/modal.svelte';
	import maplibre from 'maplibre-gl';

	import { closePopup } from '@/lib/mapObjects/interact';
	import { getMap } from '@/lib/map/map.svelte';

	function flyTo(center: number[], zoom: number) {
		closePopup()
		closeModal()
		getMap()?.setCenter({lat: center[0], lng: center[1]})
		getMap()?.setZoom(zoom)
		getMap()?.setBearing(0)
		getMap()?.setPitch(0)
	}
</script>

{#snippet searchModalSnippet()}
	<Search onjump={flyTo} />
{/snippet}

<BaseFab onclick={() => openModal(searchModalSnippet, "top")}>
	<SearchIcon size="24" />
</BaseFab>