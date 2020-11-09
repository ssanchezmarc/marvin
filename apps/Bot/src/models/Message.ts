export default class Message {
  _message: string;
  _mentions: Array<string>;
  _emojis: Array<string>;

  constructor({ message = '' }) {
    this._message = message;
    this._mentions = message.match(/<@.+?>/g) || [];
    // @todo define emoji object
    this._emojis = message.match(/:.+?:/g) || [];
  }

  mention() {
    if (!this._mentions[0]) {
      // @todo define custom exceptions object for main mention
      throw 'Any mentions in the message';
    }

    return this._mentions[0];
  }

  emoji() {
    if (!this._emojis[0]) {
      // @todo define custom exceptions object for main mention
      throw 'Any emoji in the message';
    }

    return this._emojis[0];
  }

  isForKudos() {
    return /KUDOS.+<@.+?>/.test(this._message.toUpperCase());
  }
}
