export default class InMemoryKudosRepository {
  _kudos;

  constructor({ kudos = [] } = {}) {
    this._kudos = kudos;
  }

  save(kudos) {
    this._kudos[kudos.recipient()] = kudos;
  }

  search({ recipient }) {
    return this._kudos[recipient];
  }
}