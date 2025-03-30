<script lang="ts">
	import BottomNavWrapper from '@/components/ui/nav/BottomNavWrapper.svelte';
	import BottomNavSpacing from '@/components/ui/nav/BottomNavSpacing.svelte';
	import { getConfig } from '@/lib/config';
	import * as m from '@/lib/paraglide/messages';
	import Card from '@/components/ui/Card.svelte';
	import { getUserSettings } from '@/lib/userSettings.svelte';
	import { Cloud, Eye, EyeOff, Filter, Moon, Sun } from 'lucide-svelte';
	import SelectGroupItem from '@/components/ui/settings/SelectGroupItem.svelte';
	import SelectGroup from '@/components/ui/settings/SelectGroup.svelte';
	import SettingsGeneric from '@/components/ui/settings/SettingsGeneric.svelte';
</script>

<svelte:head>
	<title>{getConfig().general.mapName} | {m.nav_filters()}</title>
</svelte:head>

{#snippet showWhat()}
	<SelectGroup
		value={"" + getUserSettings().isDarkMode}
		onValueChange={() => {}}
		class="self-center"
	>
		<SelectGroupItem class="p-4" value="false">
			<Eye size="20" />
			All
		</SelectGroupItem>
		<SelectGroupItem class="p-4" value="null">
			<EyeOff size="20" />
			None
		</SelectGroupItem>
		<SelectGroupItem class="p-4" value="true">
			<Filter size="20" />
			Filtered
		</SelectGroupItem>
	</SelectGroup>
{/snippet}

<div class="mt-2 mx-auto max-w-[30rem]">
	<Card class="pt-4 pb-2 px-2 mx-2 mb-4">
		<SettingsGeneric title="Pokémon">
			{@render showWhat()}
		</SettingsGeneric>
	</Card>
	<Card class="pt-4 pb-2 px-2 mx-2 mb-4">
		<SettingsGeneric title="Plain Pokéstops">
			{@render showWhat()}
		</SettingsGeneric>
		<SettingsGeneric title="Quests">
			{@render showWhat()}
		</SettingsGeneric>
		<SettingsGeneric title="Team Rocket">
			{@render showWhat()}
		</SettingsGeneric>
		<SettingsGeneric title="Showcases">
			{@render showWhat()}
		</SettingsGeneric>
		<SettingsGeneric title="Lures">
			{@render showWhat()}
		</SettingsGeneric>
	</Card>
	<Card class="pt-4 pb-2 px-2 mx-2">
		<SettingsGeneric title="Plain Gyms">
			{@render showWhat()}
		</SettingsGeneric>
		<SettingsGeneric title="Raids">
			{@render showWhat()}
		</SettingsGeneric>
	</Card>
</div>

<BottomNavSpacing />
<BottomNavWrapper page="/filters" />

