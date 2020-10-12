export default class InMemoryKudosRepository {
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