import { WebClient } from "@slack/web-api";

export default class Bot {
  static _TOKEN = process.env.SLACK_BOT_ACCESS_TOKEN;

  _client;

  constructor() {
    this._client = new WebClient(Bot._TOKEN);
  }

  response({ message, channel = '#general' }) {
    this._client.chat.postMessage({ channel, text: message });
  };
}