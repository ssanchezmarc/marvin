import KudosGiver from "../../../../../src/Kudos/useCases/give/KudosGiver";
import KudosGiveRequest from "../../../../../src/Kudos/useCases/give/KudosGiveRequest";

import InMemoryKudosRepository from "../../../../../src/Kudos/infrastructure/InMemoryKudosRepository";

export default class GiveKudosController {
  constructor({ kudosRepository = new InMemoryKudosRepository() } = {}) {
    this._kudosRepository = kudosRepository;
  }

  run({ message }) {
    const kudosGiver = new KudosGiver({ kudosRepository: this._kudosRepository });

    return kudosGiver.run(new KudosGiveRequest({ recipient: message.mention() }));
  }
}