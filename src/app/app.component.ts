import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {NewViewComponent} from './new-view/new-view.component';
import {Card} from './models/card';
import {BaseMonsterCurseDeck} from "./constants/decks/monster-curse-base";
import {BaseMonsterModifierDeck} from './constants/decks/monster-modifiers-base';
import {BasePlayerBlessDeck} from "./constants/decks/player-bless-base";
import _ from 'lodash';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet, NewViewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title: string = 'jotl-deck-app';

  // Draw/Discard Piles
  monsterDrawPile: Card[] = [];
  monsterDiscardPile: Card[] = [];
  monsterDrawnCards: Card[] = [];
  playerDrawPile: Card[] = [];
  playerDiscardPile: Card[] = [];
  playerDrawnCards: Card[] = [];

  // Decks
  playerBlessDeck: Card[] = [];
  monsterCurseDeck: Card[] = [];
  playerCurseDeck: Card[] = [];

  public constructor() {
    this.monsterDrawPile = _.clone(BaseMonsterModifierDeck);
    this.playerBlessDeck = _.clone(BasePlayerBlessDeck);
    this.monsterCurseDeck = _.clone(BaseMonsterCurseDeck);
    // TODO - implement player curse deck
    this.playerCurseDeck = _.clone(BaseMonsterCurseDeck);

    this.shuffleDeck();
  }

  public addBlessToMonsterModifierDeck(): void {
    const blessCard = this.playerBlessDeck.pop();
    if (blessCard) {
      this.monsterDrawPile.push(blessCard);
    } else {
      console.log('No bless cards left to add!');
    }

    this.shuffle();
    console.log(this.monsterDrawPile);
  }

  public addCurseToMonsterModifierDeck(): void {
    const curseCard = this.monsterCurseDeck.pop();
    if (curseCard) {
      this.monsterDrawPile.push(curseCard);
    } else {
      console.log('No curse cards left to add!');
    }

    this.shuffle();
    console.log(this.monsterDrawPile);
  }

  public addBlessToPlayerModifierDeck(): void {
    const blessCard = this.playerBlessDeck.pop();
    if (blessCard) {
      this.playerDrawPile.push(blessCard);
    } else {
      console.log('No bless cards left to add!');
    }
  }

  public spendBless(card: Card): void {
    this.playerBlessDeck.push(card);
  }

  // TODO - Type/enum safety for owner
  public spendCurse(owner: string, card: Card): void {
    owner === 'monster' ? this.monsterCurseDeck.push(card) : this.playerCurseDeck.push(card);
  }

  public shuffleDeck(): void {
    this.monsterDrawnCards = [];
    this.monsterDiscardPile = [];
    this.monsterDrawPile = _.clone(BaseMonsterModifierDeck);

    this.shuffle();
    console.log(this.monsterDrawPile);
  }

  public drawMonsterCard(numberDrawn: number = 1): void {
    this.monsterDrawnCards = [];
    for (let i = 0; i < numberDrawn; i++) {
      if (this.monsterDrawPile.length > 0) {
        const drawnCard = this.monsterDrawPile.pop();
        if (drawnCard) {
          this.monsterDrawnCards.push(drawnCard);
          if (drawnCard.description.includes('Bless')) {
            console.log('Bless Card Drawn!')
            this.spendBless(drawnCard);
          } else if (drawnCard.description.includes('Curse')) {
            console.log('Curse Card Drawn!')
            this.spendCurse('monster', drawnCard);
          } else {
            this.monsterDiscardPile.push(drawnCard);
          }
        }
        console.log(this.monsterDiscardPile);
      } else {
        console.log('No cards left to draw!!!');
      }
    }
  }

  public drawPlayerCard(numberDrawn: number = 1): void {
    this.playerDrawnCards = [];
    for (let i = 0; i < numberDrawn; i++) {
      if (this.playerDrawPile.length > 0) {
        const drawnCard = this.playerDrawPile.pop();
        if (drawnCard) {
          this.playerDiscardPile.push(drawnCard);
          if (drawnCard.description.includes('Bless')) {
            this.spendBless(drawnCard);
          } else if (drawnCard.description.includes('Curse')) {
            // this.spendCurse(deckOwner, drawnCard);
            console.log('TBD')
          } else {
            // this.playerDrawnCards.push(drawnCard);
            console.log('TBD')
          }
        }
        console.log(this.playerDrawPile);
      } else {
        console.log('No cards left to draw!!!');
      }
    }
  }
  /*
  TODO - Abstracted Draw Method
  public drawCard(deckOwner: string = 'monster', numberDrawn: number = 1): void {
    let discardPile: Card[] = [];
    let drawPile: Card[] = [];
    let drawnCards: Card[] = [];

    if (deckOwner === 'monster') {
      discardPile = this.monsterDiscardPile;
      drawPile = this.monsterDrawPile;
      drawnCards = this.monsterDrawnCards = [];
    } else {
      discardPile = this.playerDiscardPile;
      drawPile = this.playerDrawPile;
      drawnCards = this.playerDrawnCards = [];
    }

    for (let i = 0; i < numberDrawn; i++) {
      if (drawPile.length > 0) {
        const drawnCard = drawPile.pop();
        if (drawnCard) {
          discardPile.push(drawnCard);
          if (drawnCard.description.includes('Bless')) {
            this.spendBless(drawnCard);
          } else if (drawnCard.description.includes('Curse')) {
            // this.spendCurse(deckOwner, drawnCard);
            console.log('TBD')
          } else {
            drawnCards.push(drawnCard);
          }
        }
        console.log(drawPile);
      } else {
        console.log('No cards left to draw!!!');
      }
    }
  }
  */

  // public addCard(newCard: number = this.cards.length): void {
  //   console.log('Adding in the new card: ', newCard);
  //   this.cards.push(newCard);
  //   console.log(this.cards);
  // }

  // Stolen from the internet ty internet
  private shuffle(): void {
    let currentIndex = this.monsterDrawPile.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.monsterDrawPile[currentIndex], this.monsterDrawPile[randomIndex]] = [
        this.monsterDrawPile[randomIndex], this.monsterDrawPile[currentIndex]];
    }
  }
}
