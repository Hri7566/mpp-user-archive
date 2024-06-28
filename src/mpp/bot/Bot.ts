import { Client } from "mpp-client-net";

export interface BotConfig {
	uri: string;
	channel: string;
	user: {
		name: string;
		color: string;
	};
	token: string;
}

export class Bot {
	public client: Client;

	constructor(public config: BotConfig) {
		this.client = new Client(config.uri, config.token);

		this.client.setChannel(config.channel);
	}

	public start() {
		this.client.start();
	}

	public stop() {
		this.client.stop();
	}

	protected bindEventListeners() {
		this.client.on("hi", msg => {
			this.client.sendArray([{
				m: "+custom"
			}, {
				m: "+ls"
			}]);
		});

		this.client.on("a", msg => {
			// TODO handle chat commands
		});

		// TODO handle custom message commands
	}
}
