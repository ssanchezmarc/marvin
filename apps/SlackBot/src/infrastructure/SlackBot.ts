import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';
import SlackEventAdapter from '@slack/events-api/dist/adapter';

import dispatchAction from '../controllers/actionDispatcher';

import Bot from '../models/Bot';
import Message from '../models/Message';

const _TOKEN = process.env.SLACK_BOT_ACCESS_TOKEN || '';
const _SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET || '';
const _PORT = process.env.PORT || 3033;

export default class SlackBot implements Bot {
  _client: WebClient;
  _events: SlackEventAdapter;

  constructor() {
    this._client = new WebClient(_TOKEN);
    this._events = createEventAdapter(_SIGNING_SECRET);

    this.on({ event: 'app_mention', action: this.onAppMention });
    this.on({ event:'error', action: this.onError });
  }

  onAppMention(event) {
    const message = new Message({ message: event.text.substr(event.text.indexOf('>') + 1) });

    this.processMessage({ message });
  }

  onError(event) {
    console.error(event);
  }

  processMessage({ message }) {
    try {
      const response = dispatchAction({ message });

      this.response({ message: response.reply() });
    } catch (error) {
      console.error(error);
      this.response({ message: 'What do you mean?' });
    }
  }

  start() {
    this._events.start(_PORT); // Listening on path '/slack/events' by default

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
