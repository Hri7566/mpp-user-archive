type MaybePromise<TType> = TType | Promise<TType>;
export type CommandCallback = (input: string) => MaybePromise<string | void>;

export interface Command {
    id: string;
    aliases: string[];
    description: string;
    usage: string;
    callback: CommandCallback;
}
