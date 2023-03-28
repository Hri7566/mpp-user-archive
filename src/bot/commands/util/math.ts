import * as math from "mathjs";
import { Command, CommandHandler } from "../Command";

export const MATH = new Command(
    "math",
    ["math"],
    (msg, cl) => {
        if (!msg.argcat) return "Error: No input";
        try {
            const out = math.evaluate(msg.argcat);
            return `Output: ${out.toString()}`;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    },
    "command.util.math",
    true
);
