import type { Command } from "./Command";

export interface Prefix {
	prefix: string;
	spaced: boolean;
}

export const prefixes: Prefix[] = [
	{
		prefix: "ua",
		spaced: true
	}, {
		prefix: "userarchive",
		spaced: true
	}
];

export const commands: Command[] = [];
