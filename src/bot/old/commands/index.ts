import { CommandGroup, CommandHandler } from "./Command";
import { ABOUT } from "./general/about";
import { COLOR } from "./util/color";
import { HELP } from "./general/help";
import { NAMEHISTORY } from "./general/namehistory";
import { MATH } from "./util/math";
import { TEST } from "./general/test";
import { GROUPS } from "./general/groups";
import { PERMS } from "./general/perms";

const COMMANDS_GENERAL = new CommandGroup("general", "General", [
    HELP,
    ABOUT,
    NAMEHISTORY,
    TEST,
    GROUPS,
    PERMS
]);

const COMMANDS_UTIL = new CommandGroup("util", "Utility", [COLOR, MATH]);

CommandHandler.addCommandGroup(COMMANDS_GENERAL);
CommandHandler.addCommandGroup(COMMANDS_UTIL);
