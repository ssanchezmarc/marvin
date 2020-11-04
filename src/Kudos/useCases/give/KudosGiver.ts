import Kudos from "../../models/Kudos";

import KudosGiveResponse from "./KudosGiveResponse";
import KudosRepository from "../../models/KudosRepository";
import KudosGiveRequest from "./KudosGiveRequest";

export default class KudosGiver {
  _repository: KudosRepository;

  constructor ({ kudosRepository }: { kudosRepository: KudosRepository }) {
    this._repository = kudosRepository;
  }

  run(kudosGiveRequest: KudosGiveRequest) {
    const recipient = kudosGiveRequest.recipient();

    const recipientKudos = this._repository.search({ recipient }) || new Kudos({ recipient });

    recipientKudos.giveOne();

    this._repository.save(recipientKudos);

    return new KudosGiveResponse({
      reply: `Congrats ${recipientKudos.recipient()} :muscle:. You have already ${recipientKudos.quantity()} kudos`
    });
  }
}
