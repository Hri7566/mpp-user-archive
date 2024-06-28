import Bot from "./bot/index";

const bot = new Bot({
	uri: "wss://mppclone.com:8443",
	token: process.env.MPPNET_FINDER_TOKEN,
	channel: "zackiboiz/upandrunning",
	user: {
		name: "mpp user archive",
		// TODO color
		color: "#00ff99"
	}
});

bot.start();
