export default class KudosGiveRequest {
  constructor({ recipient }) {
    this._recipient = recipient;
  }

  recipient() {
    return this._recipient;
  }
}