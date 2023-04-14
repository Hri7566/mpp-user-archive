import React, { useState } from "react";
import { Background } from "../components/Background";
import { Link } from "react-router-dom";
import { OuterLink } from "../components/OuterLink";

export const Home = () => {
    return (
        <>
            <h2 className="text-3xl font-bold my-2">Home</h2>
            <p className="text-xl">
                This project is meant to be the penultimate data service for{" "}
                <OuterLink to="https://mppclone.com">MPP</OuterLink>. Of course,
                it's always given that when a project is written by{" "}
                <OuterLink to="https://hri7566.info">Hri7566</OuterLink>, it
                will be abandoned less than a month after launch. Let's hope
                that doesn't happen anymore.
            </p>
            <br />
            <Link
                className="text-blue-400 hover:text-blue-900 transition-all text-2xl"
                to="/console"
            >
                Web Console
            </Link>
        </>
    );
};
