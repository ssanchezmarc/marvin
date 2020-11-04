import KudosGiver from '../../../../../src/Kudos/useCases/give/KudosGiver';
import KudosGiveRequest from '../../../../../src/Kudos/useCases/give/KudosGiveRequest';
import InMemoryKudosRepository from '../../../../../src/Kudos/infrastructure/InMemoryKudosRepository';
import KudosRepository from '../../../../../src/Kudos/models/KudosRepository';

import Message from '../../models/Message';

const repositoryImplementation = new InMemoryKudosRepository();

export default class GiveKudosController {
  _kudosRepository: KudosRepository;

  constructor({ kudosRepository = repositoryImplementation } = {}) {
    this._kudosRepository = kudosRepository;
  }

  run({ message }: { message: Message }) {
    const kudosGiver = new KudosGiver({ kudosRepository: this._kudosRepository });

    return kudosGiver.run(new KudosGiveRequest({ recipient: message.mention() }));
  }
}
