import {Card} from "./card";

export interface CardChanges {
  desc: string;
  addCards: Card[];
  removeCards: string[];
}
