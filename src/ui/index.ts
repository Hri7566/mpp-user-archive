import type { ChatMessage, MPP as TMPP } from "../MPP";
import $ from "jquery";
import { Bot } from "../bot";

const MPP = (globalThis as any).MPP as TMPP;

MPP.client.on("hi", () => {
    Bot.logger.info(`Starting chat injection...`);

    const old = (MPP as any).chat.receive;

    function replace() {
        (MPP as any).chat.receive = (msg: ChatMessage) => {
            old(msg);

            const colorSpan = `<span class="user-color"></span>`;

            $(`#chat ul li:last-child .name`).before(colorSpan);
            $(`#chat ul li:last-child .user-color`).css({
                "margin-right": "8px",
                color: msg.p.color
            });
            $(`#chat ul li:last-child .user-color`).text(msg.p.color);
        };
    }

    replace();
});
