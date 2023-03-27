import { CommandGroup, CommandHandler } from "./Command";
import { HELP } from "./general/help";
import { ABOUT } from "./general/about";
import { COLOR } from "./util/color";
import { NAMEHISTORY } from "./util/namehistory";

const COMMANDS_GENERAL = new CommandGroup("general", "General", [
    HELP,
    ABOUT
]);

const COMMANDS_UTIL = new CommandGroup("util", "Utility", [
    COLOR,
    NAMEHISTORY
]);

CommandHandler.addCommandGroup(COMMANDS_GENERAL);
CommandHandler.addCommandGroup(COMMANDS_UTIL);
