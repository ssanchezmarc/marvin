import KudosGiver from "./Kudos/useCases/give/KudosGiver.js";
import KudosGiveRequest from "./Kudos/useCases/give/KudosGiveRequest.js";
import InMemoryKudosRepository from "./Kudos/infrastucture/InMemoryKudosRepository.js";

import Message from "./apps/SlackBot/Message.js";
import Bot from "./apps/SlackBot/Bot.js";

const kudosRepository = new InMemoryKudosRepository();
const bot = new Bot();

function executeUseCase({ message }) {
  if (message.isForKudos()) {
    const useCase = new KudosGiver({ kudosRepository });
    return useCase.run(new KudosGiveRequest({ recipient: message.mainMention() }));
  }

  // @todo define custom exceptions object for message does not match any use case
  throw 'Message does not match any use cases';
}

bot.on({ event: 'app_mention', action: (event) => {
  console.log(event);
  const message = new Message({ message: event.text });

  try {
    const response =  executeUseCase({ message });

    bot.response({ message: response.reply() });
  } catch (error) {
    bot.response({ message: "I know what you mean... or not" });
  }
}});
bot.on({ event:'error', action: console.error });

bot.start();
