import KudosType from "../../models/KudosType";

export default class KudosGiveRequest {
  _recipient: string;
  _type: KudosType;

  constructor({ recipient, type = KudosType.Undefined }: { recipient: string, type?: KudosType }) {
    this._recipient = recipient;
    this._type = type;
  }

  recipient() {
    return this._recipient;
  }

  type() {
    return this._type;
  }
}
