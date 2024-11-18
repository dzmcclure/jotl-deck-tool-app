import { Component, Input, OnInit } from '@angular/core';
import { ModifierCardBack } from '../../constants/cards/modifier-card-back';
import { CardComponent } from '../card/card.component';
import { Card } from '../../models/card';
import _ from 'lodash';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { BlurseDecks } from '../../service/deck-service';
import { monsterIcon, playerIcons } from '../../constants/variables';

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

export class DeckComponent implements OnInit {
  cardBackImage: string = ModifierCardBack.image;
  deckRemainderSizeStyle = '';
  shuffleCardDrawn = false;
  @Input({ required: true }) baseDeck: Card[] = [];
  @Input({ required: true }) owner!: string;
  @Input() perks: string[] = [];
  iconSrc: string = '';
  // ✓ count of remaining cards
  // ✓ shuffle
  // ✓ draw a card
  //   - if card says to draw again, draw again -- NOT IN JOTL
  //   - if card says to shuffle, shuffle (at end of round)
  //     - shuffle discard pile into draw pile
  //     ✓ visual indicator this has to happen (shuffle button border change)
  // ✓ cards can be added
  //   ✓ shuffle when a card is added
  //   ✓ independent method for monster curse
  // ✓ cards can be removed
  //   - todo: some cards remove themselves
  // ✓ end of encounter 'reset'

  // Draw/Discard Piles
  drawPile: Card[] = [];
  discardPile: Card[] = [];
  drawnCards: Card[] = [];

  public constructor(public blurseDeckService: BlurseDecks) {
    // Intentionally left blank
  }

  ngOnInit(): void {
    console.log(this.owner);
    console.log(this.baseDeck);
    this.iconSrc = playerIcons[this.owner] ?? monsterIcon;

    this.resetDeck();
    this.calculateDeckShadow();
  }

  public addBlessToModifierDeck(): void {
    const blessCard = this.blurseDeckService.drawBless();
    if (blessCard) {
      this.drawPile.push(blessCard);
    } else {
      console.log('No bless cards left to add!');
    }

    this.calculateDeckShadow();
    this.shuffle();
    console.log(this.drawPile);
  }

  public addCurseToModifierDeck(): void {
    const curseCard = this.blurseDeckService.drawCurse(this.owner);
    if (curseCard) {
      this.drawPile.push(curseCard);
    } else {
      console.log('No curse cards left to add!');
    }

    this.calculateDeckShadow();
    this.shuffle();
    console.log(this.drawPile);
  }

  public spendBless(card?: Card): void {
    if (card) {
      this.blurseDeckService.returnBless(card);
    }
  }

  public spendCurse(card: Card): void {
    this.blurseDeckService.returnCurse(this.owner, card);
  }

  public resetDeck(): void {
    this.drawnCards = [];
    this.drawPile = _.clone(this.baseDeck);
    this.shuffleDrawPile();
    this.blurseDeckService.resetDecks();
  }

  public returnDiscardsToDeck(): void {
    this.discardPile.forEach((card: Card) => {
      this.drawPile.push(card);
    });
    this.shuffleDrawPile()
  }

  public shuffleDrawPile(): void {
    this.discardPile = [];

    this.calculateDeckShadow();
    this.shuffle();
    this.shuffleCardDrawn = false;
    console.log(this.drawPile);
  }

  public drawCard(numberDrawn: number = 1): void {
    this.drawnCards = [];
    for (let i = 0; i < numberDrawn; i++) {
      if (this.drawPile.length > 0) {
        const drawnCard: Card | undefined = this.drawPile.pop();
        if (drawnCard) {
          this.drawnCards.push(drawnCard);
          if (drawnCard.description.includes('Bless')) {
            console.log('Bless Card Drawn!')
            this.spendBless(drawnCard);
          } else if (drawnCard.description.includes('Curse')) {
            console.log('Curse Card Drawn!')
            this.spendCurse(drawnCard);
          } else {
            this.discardPile.push(drawnCard);
          }

          if (drawnCard.reshuffle) {
            this.shuffleCardDrawn = true;
          }
        }
        console.log(this.discardPile);
      } else {
        console.log('No cards left to draw!!!');
      }
    }

    this.calculateDeckShadow();
  }

  public pickPerk(): void {
    //add card to base deck
    //set drawpile to base deck - call reset?
  }

  public saveDeck(): void {
    const playerInfo = JSON.stringify({
      class: this.owner,
      deck: this.baseDeck,
      perks: this.perks,
    });
    const playerBlob = new Blob([playerInfo], { type: "application/octet-stream" });

    const url = window.URL.createObjectURL(playerBlob);
    window.open(url);
  }


  private calculateDeckShadow(): void {
    const deckRemainder = this.drawPile.length / 4;
    let pixelOffset = 0;
    if (this.drawPile.length < 20) {
      pixelOffset = (5 - Math.ceil(deckRemainder)) * 2;
    }
    let shadowPixelOffset = 1;
    this.deckRemainderSizeStyle = `top: ${pixelOffset}px; left: ${pixelOffset}px; box-shadow: `;

    for (let i = 0; i < deckRemainder; i++) {
      this.deckRemainderSizeStyle += `white ${shadowPixelOffset}px ${shadowPixelOffset}px,`;
      this.deckRemainderSizeStyle += `var(--deck-card-color) ${shadowPixelOffset + 1}px ${shadowPixelOffset + 1}px,`;
      shadowPixelOffset += 2;
    }

    this.deckRemainderSizeStyle = this.deckRemainderSizeStyle.substring(0, this.deckRemainderSizeStyle.length - 1) + ';';
  }

  // Stolen from the internet ty internet
  private shuffle(): void {
    let currentIndex = this.drawPile.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.drawPile[currentIndex], this.drawPile[randomIndex]] = [
        this.drawPile[randomIndex], this.drawPile[currentIndex]];
    }
  }
}
