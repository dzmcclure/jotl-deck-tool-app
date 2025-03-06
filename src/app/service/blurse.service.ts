import {BaseMonsterCurseDeck, BasePlayerBlessDeck} from "../constants/decks";
import {Card} from "../models/card";
import _ from 'lodash';
import {Injectable, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class BlurseDecks {
  // Decks
  private blessDeck: Card[] = _.clone(BasePlayerBlessDeck);
  private monsterCurseDeck: Card[] = _.clone(BaseMonsterCurseDeck);
  private playerCurseDeck: Card[] = _.clone(BaseMonsterCurseDeck);

  public getBlessDeck(): Card[] {
    return this.blessDeck;
  }

  public drawBless(): Card | undefined {
    return this.blessDeck.pop();
  }

  public returnBless(bless: Card): void {
    this.blessDeck.push(bless);
  }

  public getCurseDeck(owner: string): Card[] {
    if (owner === 'monster')
      return this.monsterCurseDeck;
    return this.playerCurseDeck;
  }

  public drawCurse(owner: string): Card | undefined {
    if (owner === 'monster')
      return this.monsterCurseDeck.pop()
    return this.playerCurseDeck.pop()
  }

  public returnCurse(owner: string, curse: Card): void {
    if (owner === 'monster')
      this.monsterCurseDeck.push(curse);
    else
      this.playerCurseDeck.push(curse);
  }

  public resetDecks(): void {
    this.blessDeck = _.clone(BasePlayerBlessDeck);
    this.monsterCurseDeck = _.clone(BaseMonsterCurseDeck);
    this.playerCurseDeck = _.clone(BaseMonsterCurseDeck);
  }
}
