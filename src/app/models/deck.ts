import {Card} from './card';

export interface Deck {
  name: string;
  character: string;
  deck: Card[];
  perks: string[];
}
