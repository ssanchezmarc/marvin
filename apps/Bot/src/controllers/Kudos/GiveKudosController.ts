import KudosGiver from '../../../../../src/Kudos/useCases/give/KudosGiver';
import KudosGiveRequest from '../../../../../src/Kudos/useCases/give/KudosGiveRequest';
import KudosRepository from '../../../../../src/Kudos/models/KudosRepository';
import KudosType from '../../../../../src/Kudos/models/KudosType';

import Message from '../../models/Message';

export default class GiveKudosController {
  _kudosRepository: KudosRepository;

  constructor({ kudosRepository }: { kudosRepository: KudosRepository}) {
    this._kudosRepository = kudosRepository;
  }

  run({ message }: { message: Message }) {
    const recipient = message.mention();
    const type = this.typeMapper({ emoji: message.emoji()});

    const kudosGiver = new KudosGiver({ kudosRepository: this._kudosRepository });

    return kudosGiver.run(new KudosGiveRequest({ recipient, type }));
  }

  typeMapper({ emoji }: { emoji: string }) {
    if (emoji === ':gorilla:') {
      return KudosType.Engorillation
    }

    return KudosType.Undefined;
  }
}
