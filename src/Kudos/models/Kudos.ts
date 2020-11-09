import KudosType from "./KudosType";

export default class Kudos {
  _recipient: string;
  _quantity: Map<KudosType, number>;

  constructor({ recipient }: { recipient: string }) {
    this._recipient = recipient;
    this._quantity = new Map();
  }

  recipient(): string {
    return this._recipient;
  }

  quantity() {
    return Array.from(this._quantity.values()).reduce((total, currentValue) => total + currentValue);
  }

  giveOne({ type = KudosType.Undefined }: { type: KudosType }) {
    const currentKudosForType = this._quantity.get(type) || 0;

    this._quantity.set(type, currentKudosForType + 1);
  }
}
