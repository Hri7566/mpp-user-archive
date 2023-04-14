import React, { useState } from "react";
import { Background } from "../components/Background";
import { Sidebar } from "../components/Sidebar";

export const Root = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <>
            <Background />
            <Sidebar visible={sidebarVisible} />
        </>
    );
};
