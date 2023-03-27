import { Command, CommandHandler } from "../Command";

export const ABOUT = new Command("about", ["about", "a", "info"], (msg, cl) => {
    return "This bot was made by Hri7566#3409.";
}, "command.general.about", true);
