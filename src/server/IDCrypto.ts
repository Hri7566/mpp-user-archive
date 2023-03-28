import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import crypto from "node:crypto";
import { prisma } from "../data/prisma";
import { Logger } from "../util/Logger";

const { API_SALT } = process.env;

if (typeof API_SALT == "undefined") {
    throw `No API salt in environment`;
}

export class IDCrypto {
    public static logger = new Logger("IDCrypto");

    public static generateAPIHash(ip: string) {
        const hash = crypto.createHash("sha256");
        hash.update(ip);
        hash.update(API_SALT as string);
        return Buffer.from(hash.digest().buffer.slice(0, 12));
    }

    public static async generateAPIToken(id: Buffer) {
        let apiData = await prisma.apiAuth.findUnique({
            where: {
                addressHash: id
            }
        });

        if (!apiData) {
            apiData = await prisma.apiAuth.create({
                data: {
                    addressHash: id,
                    token: "",
                    groups: ["default"]
                }
            });
        }

        // TODO check API permissions
        apiData.token = `${id.toString("hex")}.${crypto.randomUUID()}`;

        await prisma.apiAuth.update({
            where: {
                addressHash: apiData.addressHash
            },
            data: {
                token: apiData.token
            }
        });

        this.logger.debug(`New token:`, apiData.token);

        return apiData.token;
    }
}
