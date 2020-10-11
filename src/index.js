// const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
// const { WebClient } = require('@slack/web-api');

import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';


// Retrieve bot token from dotenv file
const bot_token = process.env.SLACK_BOT_ACCESS_TOKEN;
const signing_secret = process.env.SLACK_SIGNING_SECRET;

// Verification token for Events Adapter
// const slackEvents = createSlackEventAdapter(verification_token);


// Slack web client
const bot = new WebClient(bot_token);

// Post message to Slack
const responseMessage = async (message) => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await bot.chat.postMessage({ channel: '#general', text: message });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
};


// Initialize using signing secret from environment variables
const slackEvents = createEventAdapter(signing_secret);
const port = process.env.PORT || 3033;

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im





class Message {
  _text;
  _mentions;

  constructor({ text }) {
    this._text = text;
  }

  mainMention() {
    const mentions = this._mentions || this._text.match(/<@.+?>/g);

    if (!mentions || !mentions[1]) {
      // @todo define custom exceptions
      throw 'No metions in the text';
    }

    return mentions[1];
  }

  text() {
    return this._text;
  }

  isForKudos() {
    return /KUDOS.+<@.+?>/.test(this._text.toUpperCase());
  }
}

let inMemoryMentions = [];

class KudosGiver {
  static fromMessage({ message }) {
    if (message.isForKudos()) {
      return new KudosGiver({ targetMember: message.mainMention() });
    }
    // @todo define custom exceptions
    throw 'Message does not match the kudos giver use cases';
  }

  constructor({ targetMember }) {
    this._targetMember = targetMember;
  }

  run() {
    if (inMemoryMentions[this._targetMember]) {
      inMemoryMentions[this._targetMember] = inMemoryMentions[this._targetMember] + 1;
    } else {
      inMemoryMentions[this._targetMember] = 1;
    }
  }
}

slackEvents.on('app_mention', (event) => {
  console.log(event);
  const message = new Message({ text: event.text });

  try {
    const kudosGiver = KudosGiver.fromMessage({ message });

    kudosGiver.run();

    const mainMention = message.mainMention();
    responseMessage(`Congrats ${mainMention} :muscle:. You have already ${inMemoryMentions[mainMention]} kudos`);
  } catch (error) {
    responseMessage("I know what you mean... or not");
  }
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`);
});

// @todo Update readme including development mode with expose and try to make more robust
// @todo Kudos use case - add kudos for a user
// @todo Kudos use case - get kudos of a channel
