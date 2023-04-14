import React, { PropsWithChildren } from "react";

export const OuterLink = (props: PropsWithChildren & { to: string }) => {
    return (
        <a
            className="text-cyan-400 hover:text-cyan-900 transition-all"
            href={props.to}
        >
            {props.children}
        </a>
    );
};
