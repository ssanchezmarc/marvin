import { WebClient } from "@slack/web-api";
import { createEventAdapter } from "@slack/events-api";

const _TOKEN = process.env.SLACK_BOT_ACCESS_TOKEN;
const _SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const _PORT = process.env.PORT;

export default class Bot {
  constructor() {
    this._client = new WebClient(_TOKEN);
    this._events = createEventAdapter(_SIGNING_SECRET);
  }

  async start() {
    await this._events.start(_PORT); // Listening on path '/slack/events' by default

    console.log(`Bot: listening on port ${_PORT}`);
  }

  async response({ message, channel = '#general' }) {
    const response = await this._client.chat.postMessage({ channel, text: message });

    console.log(`Bot: message ${response.ts} sent`);
  };

  on({ event, action }) {
    this._events.on(event, action);

    console.log(`Bot: added action on ${event}`);
  };
}