export default class Kudos {
  constructor({ recipient, quantity = 0 }) {
    this._recipient = recipient;
    this._quantity = quantity;
  }

  recipient() {
    return this._recipient;
  }

  quantity() {
    return this._quantity;
  }

  giveOne() {
    this._quantity++;
  }
}