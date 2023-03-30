export class Logger {
    protected static log(method: string, ...args: any[]) {
        const time = new Date().toLocaleTimeString();

        (console as unknown as Record<string, Function>)[method](time, ...args);
    }

    constructor(public id: string) {}

    info(...args: any[]) {
        if ((globalThis as unknown as Record<string, unknown>).isNode == true) {
            Logger.log("log", `\x1b[36m[INFO]\x1b[0m`, `[${this.id}]`, ...args);
        } else {
            Logger.log("log", `[INFO]`, `[${this.id}]`, ...args);
        }
    }

    debug(...args: any[]) {
        if ((globalThis as unknown as Record<string, unknown>).isNode == true) {
            Logger.log(
                "debug",
                `\x1b[32m[DEBUG]\x1b[0m`,
                `[${this.id}]`,
                ...args
            );
        } else {
            Logger.log("debug", `[DEBUG]`, `[${this.id}]`, ...args);
        }
    }

    warn(...args: any[]) {
        if ((globalThis as unknown as Record<string, unknown>).isNode == true) {
            Logger.log(
                "warn",
                `\x1b[33m[WARNING]\x1b[0m`,
                `[${this.id}]`,
                ...args
            );
        } else {
            Logger.log("warn", `[WARNING]`, ...args);
        }
    }

    error(...args: any) {
        if ((globalThis as unknown as Record<string, unknown>).isNode == true) {
            Logger.log(
                "error",
                `\x1b[31m[ERROR]\x1b[0m`,
                `[${this.id}]`,
                ...args
            );
        } else {
            Logger.log("error", `[ERROR]`, `[${this.id}]`, ...args);
        }
    }
}
