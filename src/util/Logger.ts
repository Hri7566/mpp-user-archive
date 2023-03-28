export class Logger {
    protected static log(method: string, ...args: any[]) {
        const time = new Date().toLocaleTimeString();

        (console as unknown as Record<string, Function>)[method](time, ...args);
    }

    constructor(public id: string) {}

    info(...args: any[]) {
        Logger.log(/* "info" */ "log", `[INFO]`, ...args);
    }

    debug(...args: any[]) {
        Logger.log("debug", `[DEBUG]`, ...args);
    }

    warn(...args: any[]) {
        Logger.log("warn", `[WARNING]`, ...args);
    }

    error(...args: any) {
        Logger.log("error", `[ERROR]`, ...args);
    }
}
