export default class KudosGiveRequest {
  _recipient;

  constructor({ recipient }) {
    this._recipient = recipient;
  }

  recipient() {
    return this._recipient;
  }
}