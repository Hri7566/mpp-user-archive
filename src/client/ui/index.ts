import type { ChatMessage, MPP as TMPP } from "../MPP";
import $ from "jquery";
import { Logger } from "../../util/Logger";

const MPP = (globalThis as any).MPP as TMPP;
const logger = new Logger("UI");

MPP.client.on("hi", () => {
    logger.info("UI creation started");
});
