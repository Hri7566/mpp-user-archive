import React, { useState } from "react";
import { ConsoleInput } from "../components/console/ConsoleInput";
import { ConsoleOutput } from "../components/console/ConsoleOutput";
import { trpc } from "../client";

export const WebConsole = () => {
    const [key, setKey] = useState(1);

    const [content, setContent] = useState([
        <p key={0}>Commands - help, ids, names</p>
    ]);

    return (
        <>
            <h2 className="text-3xl font-bold my-2">Web Console</h2>
            <div
                id="console"
                className="flex-grow overflow-auto overscroll-contain p-3 pt-0 font-mono"
            >
                <ConsoleOutput>
                    <ul>{content}</ul>
                </ConsoleOutput>
                <ConsoleInput
                    onEnter={(inputText, setInputText) => {
                        setContent([
                            ...content,
                            <>
                                <br />
                                <p key={key}>{inputText}</p>
                            </>
                        ]);

                        setKey(key + 1);
                        setInputText("");

                        let args = inputText.split(" ");
                        let argcat = inputText.substring(args[0].length);
                        let cmd = args[0].toLowerCase();

                        switch (cmd) {
                            case "help":
                                trpc.botCommand.query({
                                    command: inputText
                                });
                                break;
                        }
                    }}
                />
            </div>
        </>
    );
};
