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

export interface Participant {
	_id: string;
	id: string;
	name: string;
	color: string;
	tag: {
		text: string;
		color: string;
	}
}

export class Bot {
	public client: Client;

	constructor(public config: BotConfig) {
		this.client = new Client(config.uri, config.token);

		this.client.setChannel(config.channel);
		this.bindEventListeners();
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

		this.client.on("ls", msg => {
			if (!msg.u) return;

			for (const channel of msg.u) {
				this.sendParticipants(channel.ppl);
			}
		});

		// TODO handle custom message commands
	}

	public sendParticipants(ppl: Participant[]) {

	}
}
