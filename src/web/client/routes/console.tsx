import React, { useState } from "react";
import { ConsoleInput } from "../components/console/ConsoleInput";
import { ConsoleOutput } from "../components/console/ConsoleOutput";
import { trpc } from "../client";

export const WebConsole = () => {
    const [content, setContent] = useState([
        `
        Type "help" to view commands.
    `
    ]);

    return (
        <>
            <h2 className="text-3xl font-bold my-2">Web Console</h2>
            <div
                id="console"
                className="flex-grow overflow-auto overscroll-contain p-3 pt-0 font-mono"
            >
                <ConsoleOutput>
                    {content.map((ele, index) => {
                        return ele === "" ? (
                            <br key={index} />
                        ) : (
                            <li key={index}>{ele}</li>
                        );
                    })}
                </ConsoleOutput>
                <ConsoleInput
                    onEnter={async (inputText, setInputText) => {
                        let newContent = [...content, "", inputText];
                        setContent(newContent);
                        setInputText("");

                        const output = await trpc.botCommand.query({
                            command: inputText
                        });

                        setContent([...newContent, output]);
                    }}
                />
            </div>
        </>
    );
};
