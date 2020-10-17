export default class Message {
  constructor({ message = '' }) {
    this._message = message;
    this._mentions = message.match(/<@.+?>/g) || [];
  }

  mention() {
    if (!this._mentions[0]) {
      // @todo define custom exceptions object for main mention
      throw 'Any mentions in the message';
    }

    return this._mentions[0];
  }

  isForKudos() {
    return /KUDOS.+<@.+?>/.test(this._message.toUpperCase());
  }
}