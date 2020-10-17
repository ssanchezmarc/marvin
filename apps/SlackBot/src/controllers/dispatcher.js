import GiveKudosController from "./Kudos/GiveKudosController";

export default function dispatch({ message }) {
  if (message.isForKudos()) {
    return new GiveKudosController().run({ message });
  }

  // @todo define custom exceptions object for message does not match any use case
  throw 'Message does not match any use cases';
}