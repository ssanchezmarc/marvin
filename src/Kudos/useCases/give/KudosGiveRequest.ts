export default class KudosGiveRequest {
  _recipient: string;

  constructor({ recipient }: { recipient: string }) {
    this._recipient = recipient;
  }

  recipient() {
    return this._recipient;
  }
}
