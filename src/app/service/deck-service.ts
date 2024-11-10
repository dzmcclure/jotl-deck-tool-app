import { BaseMonsterCurseDeck, BasePlayerBlessDeck } from "../constants/decks";
import { Card } from "../models/card";
import _ from 'lodash';
import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class BlurseDecks {
  // Decks
  private blessDeckSignal: Card[] = _.clone(BasePlayerBlessDeck);
  private monsterCurseDeckSignal: WritableSignal<Card[]> = signal(_.clone(BaseMonsterCurseDeck));
  private playerCurseDeckSignal: WritableSignal<Card[]> = signal(_.clone(BaseMonsterCurseDeck));

  public getBlessDeck() : Card[] {
    return this.blessDeckSignal;
  }

  public drawBless() : Card | undefined {
    return this.blessDeckSignal.pop();
  }
  
  public returnBless (bless: Card) : void {
    this.blessDeckSignal.push(bless);
  }
  
  public getCurseDeck(owner: string) : Card[] {
    if (owner === 'monster')
      return this.monsterCurseDeckSignal();
    return this.playerCurseDeckSignal();
  }
  
  public drawCurse (owner: string): Card | undefined {
    if (owner === 'monster')
      return this.monsterCurseDeckSignal().pop()
    return this.playerCurseDeckSignal().pop()
  }
  
  public returnCurse (owner: string, curse: Card): void{
    if (owner === 'monster')
      this.monsterCurseDeckSignal().push(curse);
    else
      this.playerCurseDeckSignal().push(curse);
  }
  
  public resetDecks (): void{
    this.blessDeckSignal=_.clone(BasePlayerBlessDeck);
      this.monsterCurseDeckSignal.set(_.clone(BaseMonsterCurseDeck));
      this.playerCurseDeckSignal.set(_.clone(BaseMonsterCurseDeck));
  }
}
