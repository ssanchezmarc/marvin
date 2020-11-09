import Kudos from "../../models/Kudos";

import KudosGiveResponse from "./KudosGiveResponse";
import KudosRepository from "../../models/KudosRepository";
import KudosGiveRequest from "./KudosGiveRequest";
import KudosType from "../../models/KudosType";

export default class KudosGiver {
  _repository: KudosRepository;

  constructor ({ kudosRepository }: { kudosRepository: KudosRepository }) {
    this._repository = kudosRepository;
  }

  run(kudosGiveRequest: KudosGiveRequest) {
    const recipient = kudosGiveRequest.recipient();
    const type = kudosGiveRequest.type();

    const recipientKudos = this._repository.search({ recipient }) || new Kudos({ recipient });

    recipientKudos.giveOne({ type });

    this._repository.save(recipientKudos);

    if (type === KudosType.Engorillation) {
      return new KudosGiveResponse({
        reply: `Well done ${recipientKudos.recipient()}! :muscle:. No mountain is tall enough for you`
      });
    }

    return new KudosGiveResponse({
      reply: `Congrats ${recipientKudos.recipient()} :muscle:. You have already ${recipientKudos.quantity()} kudos`
    });
  }
}
