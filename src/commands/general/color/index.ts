import { Command, CommandHandler } from "../../Command";
import { Cosmic } from "./CosmicColor";

export const COLOR = new Command("color", ["color", "c"], (msg, cl) => {
    const color = new Cosmic.Color(msg.argcat || msg.user.color);
    return `Color: ${color.getName()} [${color.toHexa()}] (${color.r}, ${color.g}, ${color.b})`;
}, "command.general.color", true);
