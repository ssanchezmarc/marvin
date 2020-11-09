import InMemoryKudosRepository from '../../../../../src/Kudos/infrastructure/InMemoryKudosRepository';

import Message from '../../../src/models/Message';
import GiveKudosController from '../../../src/controllers/Kudos/GiveKudosController';

describe('GiveKudosController', () => {
  let subject: GiveKudosController;

  beforeEach(() => {
    const kudosRepository = new InMemoryKudosRepository();
    subject = new GiveKudosController({ kudosRepository });
  });

  it('should increment the counter of kudos when you are mentioned for them', () => {
    const message = new Message({ message: 'kudos :bee: for <@Sergio>'});

    let response = subject.run({ message });
    expect(response.reply()).toEqual('Congrats <@Sergio> :muscle:. You have already 1 kudos');
    response = subject.run({ message });

    expect(response.reply()).toEqual('Congrats <@Sergio> :muscle:. You have already 2 kudos');
  });

  it('should support animal kudos counter the counter', () => {
    const message = new Message({ message: ':gorilla: kudos for <@Sergio>'});

    const response = subject.run({ message });

    expect(response.reply()).toEqual('Well done <@Sergio>! :muscle:. No mountain is tall enough for you');
  });
});
