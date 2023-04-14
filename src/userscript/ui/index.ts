import type { ChatMessage, MPP as TMPP } from "../typings/MPP";
import $ from "jquery";
import { Logger } from "../../util/Logger";
import { Settings } from "../settings";
import { reload } from "..";

const MPP = (globalThis as any).MPP as TMPP;
const logger = new Logger("UI");

export const modalHandleEsc = (evt: JQuery.Event) => {
    if (evt.key == "Escape") {
        closeModal();
        evt.preventDefault();
        evt.stopPropagation();
    }
};

export const openModal = (selector: string, focus?: string) => {
    if ((MPP as any).chat) (MPP as any).chat.blur();
    $(document).on("keydown", modalHandleEsc);
    $("#modal #modals > *").hide();
    $("#modal").fadeIn(250);
    $(selector).show();
    setTimeout(() => {
        if (focus) {
            $(selector).find(focus).focus();
        }
    }, 100);
};

export const closeModal = () => {
    $("#modal").fadeOut();
    $("#modal #modals > *").hide();
};

MPP.client.on("hi", () => {
    const menuButton = `<div id="archive-btn" class="ugly-button" style="position: absolute; left: 420px; top: 32px;">Archive Settings</div>`;
    $("#bottom .relative").append(menuButton);

    const menu = `<div id="archive-settings" class="dialog" style="display: none;"><p><label><input class="checkbox translate" type="checkbox" name="enable-archive"> Enable archive protocol</label></p><button class="submit">SUBMIT</button></div>`;
    $("#modal #modals").append(menu);

    $("#archive-btn").on("click", () => {
        openModal("#modals #archive-settings");

        setTimeout(() => {
            $("#archive-settings .checkbox[name=enable-archive]").prop(
                "checked",
                Settings.enableArchive
            );
        }, 100);
    });

    $("#archive-settings .submit").on("click", () => {
        Settings.enableArchive = $(
            "#archive-settings .checkbox[name=enable-archive]"
        ).is(":checked");

        logger.debug(Settings);
        reload();
        closeModal();
    });
});
