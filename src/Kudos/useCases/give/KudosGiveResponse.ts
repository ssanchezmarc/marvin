export default class KudosGiveResponse {
  constructor({ reply }) {
    this._reply = reply;
  }

  reply() {
    return this._reply;
  }
}