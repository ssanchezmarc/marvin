import InMemoryKudosRepository from "../../../../src/Kudos/infrastructure/InMemoryKudosRepository";
import KudosGiveRequest from "../../../../src/Kudos/useCases/give/KudosGiveRequest";
import KudosGiver from "../../../../src/Kudos/useCases/give/KudosGiver";

describe('KudosGiver', () => {
  test('should increment in one the number of kudos of a recipient', () => {
    const kudosRepository = new InMemoryKudosRepository();
    const recipient = 'foo';

    const subject = new KudosGiver({ kudosRepository });

    subject.run(new KudosGiveRequest({ recipient }));

    expect(kudosRepository.search({ recipient }).quantity()).toBe(1);
  });
});