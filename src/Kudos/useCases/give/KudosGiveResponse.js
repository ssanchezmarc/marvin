export default class KudosGiveResponse {
  _reply;

  constructor({ reply }) {
    this._reply = reply;
  }

  reply() {
    return this._reply;
  }
}