import { WebClient } from "@slack/web-api";
import { createEventAdapter } from "@slack/events-api";

export default class Bot {
  static _TOKEN = process.env.SLACK_BOT_ACCESS_TOKEN;
  static _SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;

  _client;
  _events;

  constructor() {
    this._client = new WebClient(Bot._TOKEN);
    this._events = createEventAdapter(Bot._SIGNING_SECRET);
  }

  async start() {
    const port = process.env.PORT;

    await this._events.start(port); // Listening on path '/slack/events' by default

    console.log(`Bot: listening on port ${port}`);
  }

  async response({ message, channel = '#general' }) {
    const response = await this._client.chat.postMessage({ channel, text: message });

    console.log(`Bot: message ${response.ts} sent`);
  };

  async on({ event, action }) {
    this._events.on(event, action);

    console.log(`Bot: added action on ${event}`);
  };
}