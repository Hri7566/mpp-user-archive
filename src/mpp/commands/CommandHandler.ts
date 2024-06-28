import { commands } from ".";
import type { Participant } from "../bot/Bot";

export interface IChatData {
	m: "a";
	a: string;
	p: Participant;
	t: number;
}

export interface ICommandData extends IChatData {
	usedCommand: string;
	usedPrefix: string;
	args: string[];
	argcat: string;
}

export function handleCommand(msg: IChatData) {
	const args = msg.a.split(" ");
	const argcat = msg.a.substring(args[0].length);

	// Check the prefix
	for (const prefix of prefixes) {

	}

	// Get the command used

	// Check the command
	for (const command of commands) {
	}
}
