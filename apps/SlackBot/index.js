import Message from "./src/Message.js";
import Bot from "./src/Bot.js";
import dispatch from "./src/controllers/dispatcher";

const bot = new Bot();

bot.on({ event: 'app_mention', action: (event) => {
  const message = new Message({ message: event.text.substr(event.text.indexOf(' ') + 1) });

  try {
    const response = dispatch({ message });

    bot.response({ message: response.reply() });
  } catch (error) {
    console.error(error);
    bot.response({ message: 'What do you mean?' });
  }
}});
bot.on({ event:'error', action: console.error });

bot.start();
