<script lang="ts">
	import { getOpenedMenu } from '@/lib/ui/menus.svelte.js';
	import ProfileMenu from '@/components/menus/profile/ProfileMenu.svelte';
	import FiltersMenu from '@/components/menus/filters/FiltersMenu.svelte';
	import { slide } from 'svelte/transition';
	import ScoutMenu from '@/components/menus/scout/ScoutMenu.svelte';
</script>

{#if getOpenedMenu() === "profile"}
	<ProfileMenu />
{:else if getOpenedMenu() === "filters"}
	<FiltersMenu />
{:else if getOpenedMenu() === "scout"}
	<ScoutMenu />
{/if}