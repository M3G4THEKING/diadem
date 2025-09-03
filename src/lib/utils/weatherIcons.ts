import { CloudOff, CloudSun, Cloudy, Snowflake, Sun, Umbrella, Waves, Wind } from "lucide-svelte";
import type { LucideIcon } from "@/lib/types/lucide";

const weatherIcons: { [key: number]: LucideIcon } = {
	1: Sun,
	2: Umbrella,
	3: CloudSun,
	4: Cloudy,
	5: Wind,
	6: Snowflake,
	7: Waves
};

export function getWeatherIcon(weatherId: number | undefined | null) {
	return weatherIcons[weatherId ?? 0] ?? CloudOff;
}
