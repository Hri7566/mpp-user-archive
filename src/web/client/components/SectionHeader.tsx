import React from "react";

export const SectionHeader = (props: React.PropsWithChildren) => {
    return <h2 className="text-3xl font-bold my-2">{props.children}</h2>;
};
