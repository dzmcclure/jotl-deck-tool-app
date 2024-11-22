import {Deck} from "../models/deck";
import _ from "lodash";
import {PERKS} from "../constants/perks";

export function choosePerk(inputDeck: Deck, perkId: string) {
  const modifiedDeck = _.cloneDeep(inputDeck);

  modifiedDeck.deck = _.differenceWith(modifiedDeck.deck, PERKS[perkId].removeCards, (obj, id) => obj.id === id);
  console.log(modifiedDeck);
  modifiedDeck.deck = _.union(modifiedDeck.deck, PERKS[perkId].addCards);
  console.log(modifiedDeck);
  modifiedDeck.perks.push(perkId);

  return modifiedDeck;
}

