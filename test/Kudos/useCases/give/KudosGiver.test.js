import InMemoryKudosRepository from "../../../../src/Kudos/infrastucture/InMemoryKudosRepository";
import KudosGiveRequest from "../../../../src/Kudos/useCases/give/KudosGiveRequest";

describe('KudosGiver', () => {
  test('should increment in one the number of kudos of a recipient', () => {
    const kudosRepository = new InMemoryKudosRepository();
    const recipient = 'foo';

    const subject = new KudosGiver({ kudosRepository });

    subject.run(new KudosGiveRequest({ recipient }));

    expect(kudosRepository.search({ recipient }).quantity()).toBe(1);
  });
});