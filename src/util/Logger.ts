let ENABLE_COLORS = false;

if ((globalThis as unknown as Record<string, unknown>).isNode == true) {
    console.debug("color enable");
    ENABLE_COLORS = true;
}

export class Logger {
    protected static log(method: string, ...args: any[]) {
        const time = new Date().toLocaleTimeString();

        (console as unknown as Record<string, Function>)[method](time, ...args);
    }

    constructor(public id: string) {}

    info(...args: any[]) {
        if (ENABLE_COLORS) {
            Logger.log("log", `\x1b[36m[INFO]\x1b[0m`, ...args);
        } else {
            Logger.log("log", `[INFO]`, ...args);
        }
    }

    debug(...args: any[]) {
        if (ENABLE_COLORS) {
            Logger.log("debug", `\x1b[31m[DEBUG]\x1b[0m`, ...args);
        } else {
            Logger.log("debug", `[DEBUG]`, ...args);
        }
    }

    warn(...args: any[]) {
        if (ENABLE_COLORS) {
            Logger.log("warn", `\x1b[33m[WARNING]\x1b[0m`, ...args);
        } else {
            Logger.log("warn", `[WARNING]`, ...args);
        }
    }

    error(...args: any) {
        if (ENABLE_COLORS) {
            Logger.log("error", `[ERROR]`, ...args);
        } else {
            Logger.log("error", `\x1b[32m[ERROR]\x1b[0m`, ...args);
        }
    }
}
