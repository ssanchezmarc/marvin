import Kudos from "./Kudos";

interface KudosRepository {
  save(kudos: Kudos): void;
  // @to-do define a type criteria
  search(criteria: { recipient: string }): Kudos | undefined;
}

export default KudosRepository;