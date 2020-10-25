import KudosRepository from "../models/KudosRepository";
import Kudos from "../models/Kudos";

export default class InMemoryKudosRepository implements KudosRepository {
  _kudos: Map<string,Kudos>;

  constructor({ kudos = new Map() } = {}) {
    this._kudos = kudos;
  }

  save(kudos: Kudos): void {
    this._kudos.set(kudos.recipient(), kudos);
  }

  search({ recipient }: { recipient: string }): Kudos | undefined {
    return this._kudos.get(recipient);
  }
}