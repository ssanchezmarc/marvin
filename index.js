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
const web = new WebClient(bot_token);
const bot = new WebClient(bot_token);

// Post message to Slack
(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: '#general', text: 'Hello, I am Bot' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();

