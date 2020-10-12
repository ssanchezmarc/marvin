import { WebClient } from "@slack/web-api";
import { createEventAdapter } from "@slack/events-api";

export default class Bot {
  static _TOKEN = process.env.SLACK_BOT_ACCESS_TOKEN;
  static _SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
  static _PORT = process.env.PORT;

  _client;
  _events;

  constructor() {
    this._client = new WebClient(Bot._TOKEN);
    this._events = createEventAdapter(Bot._SIGNING_SECRET);
  }

  async start() {
    await this._events.start(Bot._PORT); // Listening on path '/slack/events' by default

    console.log(`Bot: listening on port ${Bot._PORT}`);
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