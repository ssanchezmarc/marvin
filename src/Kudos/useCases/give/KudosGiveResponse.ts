export default class KudosGiveResponse {
  _reply: string;

  constructor({ reply }: { reply: string }) {
    this._reply = reply;
  }

  reply() {
    return this._reply;
  }
}
