// const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const { WebClient } = require('@slack/web-api');

// Retrieve bot token from dotenv file
const bot_token = 'xoxb-1420508250786-1420517329170-enpipAbj1iLd4aUMNlyJIvW5';
// Authorization token
const auth_token = 'xoxp-1420508250786-1420715563667-1426698799700-cd6cc74d72868780ed9d1e381f7d2d4b' || '';

const verification_token = 'cd3a550f657c304e024d13d9bb5181cf';
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
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter('cd3a550f657c304e024d13d9bb5181cf');
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

