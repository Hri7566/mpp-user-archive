import React, { useState } from "react";

export const ConsoleInput = (
    props: React.PropsWithChildren & {
        onEnter: (
            text: string,
            setText: React.Dispatch<React.SetStateAction<string>>
        ) => void;
    }
) => {
    const [text, setText] = useState("");

    return (
        <>
            <input
                type="text"
                className="bg-[#ffffff05] ring-1 ring-inset ring-[#ffffff08] p-2 rounded-md focus:outline-none focus:ring-stone-800 w-full mt-auto mb-0 transition-colors duration-300"
                onChange={evt => {
                    setText(evt.target.value);
                }}
                value={text}
                onKeyDown={evt => {
                    if (evt.key == "Enter" && text !== "") {
                        props.onEnter(text, setText);
                    }
                }}
                placeholder={`Type here`}
            />
        </>
    );
};
