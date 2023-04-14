import React from "react";
import { ConsoleInput } from "../components/console/ConsoleInput";
import { ConsoleOutput } from "../components/console/ConsoleOutput";

export const WebConsole = () => {
    return (
        <div id="console" className="flex flex-col mt-auto">
            <ConsoleOutput />
            <ConsoleInput />
        </div>
    );
};
