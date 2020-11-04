import GiveKudosController from "./Kudos/GiveKudosController";

import Message from "../models/Message";

export default function dispatchAction({ message }: { message: Message }) {
  if (message.isForKudos()) {
    return new GiveKudosController().run({ message });
  } else {
    // @todo define custom exceptions object for message does not match any use case
    throw 'Message does not match any use cases';
  }
}
