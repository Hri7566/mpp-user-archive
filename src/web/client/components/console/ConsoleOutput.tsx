import React from "react";

export const ConsoleOutput = (props: React.PropsWithChildren) => {
    return props.children ? (
        // has content
        <div className="flex flex-col flex-1 h-full">
            <ul className="flex-1 bg-[#ffffff05] ring-1 ring-[#ffffff08] my-4 p-2 rounded-md">
                {props.children}
            </ul>
        </div>
    ) : (
        // blank
        <></>
    );
};
