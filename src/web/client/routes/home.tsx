import React, { useState } from "react";
import { Background } from "../components/Background";
import { Link } from "react-router-dom";
import { OuterLink } from "../components/OuterLink";
import { SectionHeader } from "../components/SectionHeader";

export const Home = () => {
    return (
        <>
            <SectionHeader>Home</SectionHeader>
            <p className="text-xl">
                This project is meant to be the penultimate data service for{" "}
                <OuterLink to="https://mppclone.com">MPP</OuterLink>. Let's hope
                this project lasts more than a month.
            </p>
            <br />
            <Link
                className="text-blue-400 hover:text-blue-900 transition-all text-2xl"
                to="/console"
            >
                Click here to visit the Web Console
            </Link>
            <SectionHeader>Info</SectionHeader>
            <p className="text-xl">
                This project was written with very little reason in mind. The
                initial idea was to have other users be "finder clients" for
                MPP. The userscript for this is available at TODO
                {/* TODO */}. All this script does is grab all of the users in
                the channel you're currently in and send their names, user IDs,
                colors, and tags to my database.
            </p>
            <br />
            <p className="text-xl">
                This project works thanks to the following:
            </p>
            <ul>
                <li>
                    <a
                        href="https://prisma.io"
                        className="text-xl text-blue-400 hover:text-blue-900"
                    >
                        Prisma
                    </a>
                </li>
                <li>
                    <a
                        href="https://planetscale.com"
                        className="text-xl text-blue-400 hover:text-blue-900"
                    >
                        PlanetScale
                    </a>
                </li>
                <li>
                    <a
                        href="https://trpc.io"
                        className="text-xl text-blue-400 hover:text-blue-900"
                    >
                        tRPC
                    </a>
                </li>
                <li>
                    <a
                        href="https://react.dev"
                        className="text-xl text-blue-400 hover:text-blue-900"
                    >
                        React
                    </a>
                </li>
                <li>
                    <a
                        href="https://esbuild.github.io"
                        className="text-xl text-blue-400 hover:text-blue-900"
                    >
                        esbuild
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.fastify.io/"
                        className="text-xl text-blue-400 hover:text-blue-900"
                    >
                        Fastify
                    </a>
                </li>
            </ul>
        </>
    );
};
