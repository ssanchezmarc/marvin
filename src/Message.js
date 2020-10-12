export default class Message {
  _message;
  _mentions;

  constructor({ message = '' }) {
    this._message = message;
    this._mentions = message.match(/<@.+?>/g) || [];
  }

  subject() {
    if (!this._mentions[0]) {
      // @todo define custom exceptions
      throw 'No subject mention in the message';
    }

    return this._mentions[0];
  }

  mentions() {
    if (!this._mentions[1]) {
      // @todo define custom exceptions
      throw 'Any mentions a part of the subject in the message';
    }

    return [...this._mentions].shift();
  }

  mainMention() {
    if (!this._mentions[1]) {
      // @todo define custom exceptions
      throw 'Any mentions a part of the subject in the message';
    }

    return this._mentions[1];
  }

  message() {
    return this._message;
  }

  isForKudos() {
    return /KUDOS.+<@.+?>/.test(this._message.toUpperCase());
  }
}