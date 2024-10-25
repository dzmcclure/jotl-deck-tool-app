import {Component} from '@angular/core';
import {ModifierCardBack} from '../../constants/cards/modifier-card-back';
import {CardComponent} from '../card/card.component';
import {Card} from '../../models/card';
import _ from 'lodash';
import {BaseMonsterCurseDeck, BaseMonsterModifierDeck, BasePlayerBlessDeck} from '../../constants/decks';
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    CardComponent,
    NgOptimizedImage,
    NgClass,
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})

export class DeckComponent {
  cardBackImage: string = ModifierCardBack.image;
  deckRemainderSizeStyle = '';
  shuffleCardDrawn = false;
  // - count of remaining cards
  // - shuffle
  // - draw a card
  //   - if card says to draw again, draw again
  //   - if card says to shuffle, shuffle
  //     - shuffle discard pile into draw pile
  //     - visual indicator this has happened (alert?) (bold color changed deck count number)
  // - cards can be added
  //   - shuffle when a card is added
  //   - independent method for monster curse
  // - cards can be removed
  //   - some cards remove themselves
  // - end of encounter 'reset' - load deck?

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

    this.resetMonsterDeck();
    this.calculateDeckShadow();
  }

  public addBlessToMonsterModifierDeck(): void {
    const blessCard = this.playerBlessDeck.pop();
    if (blessCard) {
      this.monsterDrawPile.push(blessCard);
    } else {
      console.log('No bless cards left to add!');
    }

    this.calculateDeckShadow();
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

    this.calculateDeckShadow();
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

  public resetMonsterDeck(): void {
    this.monsterDrawnCards = [];
    this.monsterDrawPile = _.clone(BaseMonsterModifierDeck);
    this.shuffleMonsterDeck();
  }

  public returnMonsterDiscardsToDeck(): void {
    this.monsterDiscardPile.forEach((card: Card) => {
      this.monsterDrawPile.push(card);
    });
    this.shuffleMonsterDeck()
  }

  public shuffleMonsterDeck(): void {
    this.monsterDiscardPile = [];

    this.calculateDeckShadow();
    this.shuffle();
    this.shuffleCardDrawn = false;
    console.log(this.monsterDrawPile);
  }

  public drawMonsterCard(numberDrawn: number = 1): void {
    this.monsterDrawnCards = [];
    for (let i = 0; i < numberDrawn; i++) {
      if (this.monsterDrawPile.length > 0) {
        const drawnCard: Card | undefined = this.monsterDrawPile.pop();
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

          if (drawnCard.reshuffle) {
            this.shuffleCardDrawn = true;
          }
        }
        console.log(this.monsterDiscardPile);
      } else {
        console.log('No cards left to draw!!!');
      }
    }

    this.calculateDeckShadow();
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

  private calculateDeckShadow(): void {
    const deckRemainder = this.monsterDrawPile.length / 4;
    let pixelOffset = 0;
    if(this.monsterDrawPile.length < 20) {
      pixelOffset = (5 - Math.ceil(deckRemainder)) * 2;
    }
    let shadowPixelOffset = 1;
    this.deckRemainderSizeStyle = `top: ${pixelOffset}px; left: ${pixelOffset}px; box-shadow: `;

    for(let i = 0; i < deckRemainder; i++) {
      this.deckRemainderSizeStyle += `white ${shadowPixelOffset}px ${shadowPixelOffset}px,`;
      this.deckRemainderSizeStyle += `var(--deck-card-color) ${shadowPixelOffset+1}px ${shadowPixelOffset+1}px,`;
      shadowPixelOffset += 2;
    }

    this.deckRemainderSizeStyle = this.deckRemainderSizeStyle.substring(0, this.deckRemainderSizeStyle.length - 1) + ';';
  }

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
