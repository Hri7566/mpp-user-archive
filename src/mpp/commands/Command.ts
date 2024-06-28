export type TCommandCallback = () => Promise<string | void>;

export class Command {
	constructor(
		public aliases: string[],
		public description: string,
		public usage: string,
		public callback: TCommandCallback,
		public visible = true
	) { }
}
