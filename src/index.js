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
const responseMessage = async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await bot.chat.postMessage({ channel: '#general', text: 'Hello, I am Bot' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
};


// Initialize using signing secret from environment variables
const slackEvents = createEventAdapter(signing_secret);
const port = process.env.PORT || 3033;

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('app_mention', (event) => {
  console.log(event);
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  responseMessage();
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`);
});

// @todo Add dotenv
// @todo Update readme including development mode with expose and try to make more robust
// @todo Kudos use case - add kudos for a user
// @todo Add testing framework
// @todo Kudos use case - get kudos of a channel
// @todo Support node last version in this specific project


