import { Participant } from "../util/MPP";

type MaybePromise<TType> = TType | Promise<TType>;
export type CommandCallback = (
    args: string[],
    p: Participant
) => MaybePromise<string | void>;

export interface Command {
    id: string;
    aliases: string[];
    func: CommandCallback;
    visible: boolean;
}
