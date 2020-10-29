export default class Kudos {
  _recipient: string;
  _quantity: number;

  constructor({ recipient, quantity = 0 }: { recipient: string, quantity?: number}) {
    this._recipient = recipient;
    this._quantity = quantity;
  }

  recipient(): string {
    return this._recipient;
  }

  quantity() {
    return this._quantity;
  }

  giveOne() {
    this._quantity++;
  }
}
