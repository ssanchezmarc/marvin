import Kudos from "../../models/Kudos.js";

import KudosGiveResponse from "./KudosGiveResponse.js";

export default class KudosGiver {
  constructor ({ kudosRepository }) {
    this._repository = kudosRepository;
  }

  run(kudosGiveRequest) {
    const recipient = kudosGiveRequest.recipient();

    const recipientKudos = this._repository.search({ recipient }) || new Kudos({ recipient });
    recipientKudos.giveOne();

    this._repository.save(recipientKudos);

    return new KudosGiveResponse({
      reply: `Congrats ${recipientKudos.recipient()} :muscle:. You have already ${recipientKudos.quantity()} kudos`
    });
  }
}