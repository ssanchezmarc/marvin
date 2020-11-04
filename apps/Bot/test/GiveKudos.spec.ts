import dispathAction from '../src/controllers/actionDispatcher';
import Message from "../src/models/Message";

describe('GiveKudos', () => {
  it('should increment the counter of kudos when you are mentioned for them', () => {
    const message = new Message({ message: 'kudos for <@Sergio>'});
    let response = dispathAction({ message });
    expect(response.reply()).toEqual('Congrats <@Sergio> :muscle:. You have already 1 kudos');

    response = dispathAction({ message });
    expect(response.reply()).toEqual('Congrats <@Sergio> :muscle:. You have already 2 kudos');
  });
});
