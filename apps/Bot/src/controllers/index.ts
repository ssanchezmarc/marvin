import InMemoryKudosRepository from '../../../../src/Kudos/infrastructure/InMemoryKudosRepository';

import Message from '../models/Message';

import GiveKudosController from './Kudos/GiveKudosController';

// Dependencies injection
const repositoryImplementation = new InMemoryKudosRepository();

export default function dispatchAction({ message }: { message: Message }) {
  if (message.isForKudos()) {
    return new GiveKudosController({ kudosRepository: repositoryImplementation }).run({ message });
  } else {
    // @todo define custom exceptions object for message does not match any use case
    throw 'Message does not match any use cases';
  }
}
