import type { MinMax } from '@/lib/features/filters/filtersets';

export type GolbatPokemonQuery = {
	pokemon?: { id: number; form?: number }[];
	iv?: MinMax;
	atk_iv?: MinMax;
	def_iv?: MinMax;
	sta_iv?: MinMax;
	level?: MinMax;
	cp?: MinMax;
	gender?: number[];
	size?: MinMax;
	pvp_little?: MinMax;
	pvp_great?: MinMax;
	pvp_ultra?: MinMax;
};

export type PokemonStatEntry = {
	shiny?: {
		shinies: number
		total: number
		days: number
	}
	spawns?: {
		count: number
		days: number
	}
}

export type TotalPokemonStats = {
	count: number
	days: number
}

export type MasterStats = {
	totalPokemon: TotalPokemonStats
	pokemon: {
		[key: string]: PokemonStatEntry // key format: "pokemonId-formId"
	}
	generatedAt: number
}