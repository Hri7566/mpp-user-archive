import React from "react";

export const Sidebar = (props: { visible: boolean }) => {
    return (
        <div
            id="sidebar"
            className="z-0 text-white h-screen w-1/4 flex justify-center bg-zinc-900"
            style={{ display: props.visible ? "" : "none" }}
        >
            <p id="sidebar-title" className="text-2xl px-2 py-1">
                sidebar title
            </p>
        </div>
    );
};
