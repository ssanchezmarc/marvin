import Kudos from "./Kudos";

interface KudosRepository {
  save(kudos: Kudos): void;
  // @todo define a type criteria
  search(criteria: { recipient: string }): Kudos | undefined;
}

export default KudosRepository;
