import { CommandGroup, CommandHandler } from "./Command";
import { ABOUT } from "./general/about";
import { COLOR } from "./general/color";
import { HELP } from "./general/help";
import { NAMEHISTORY } from "./general/namehistory";

const COMMANDS_GENERAL = new CommandGroup("general", "General", [
    HELP,
    ABOUT,
    NAMEHISTORY,
    COLOR
]);

CommandHandler.addCommandGroup(COMMANDS_GENERAL);
