import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { ModifierCardBack } from '../../constants/cards/modifier-card-back';
import { CardComponent } from '../card/card.component';
import { Card } from '../../models/card';
import _ from 'lodash';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { BlurseDecks } from '../../service/deck.service';
import { monsterIcon, playerIcons } from '../../constants/variables';
import { choosePerk } from '../../service/perk.service';
import { Deck } from '../../models/deck';
import { PerksListComponent } from '../perks-list/perks-list.component';
import { BaseMonsterCurseDeck, BasePlayerBlessDeck } from "../../constants/decks";

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    CardComponent,
    NgOptimizedImage,
    NgClass,
    PerksListComponent,
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

  // Draw/Discard Piles
  drawPile: Card[] = [];
  discardPile: Card[] = [];
  drawnCards: Card[] = [];

  // form
  perksFormVisible = false;
  @ViewChild("perksModal") perksModalRef: ElementRef | undefined;

  public constructor(public blurseDeckService: BlurseDecks) {
    // Intentionally left blank
  }

  ngOnInit(): void {
    console.log('owner: ', this.owner);
    console.log('starting deck: ', this.baseDeck);
    this.iconSrc = playerIcons[this.owner] ?? monsterIcon;

    this.initPerks();
    this.resetDeck();
    this.calculateDeckShadow();
  }

  private initPerks(): void {


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
    this.drawPile.forEach((card) => {
      if (_.includes(BasePlayerBlessDeck, card)) {
        this.spendBless(card);
      } else if (_.includes(BaseMonsterCurseDeck, card)) {
        this.spendCurse(card);
      }
    });
    this.drawPile = _.clone(this.baseDeck);
    this.shuffleDrawPile();
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
  }

  public drawCard(numberDrawn: number = 1): void {
    this.drawnCards = [];
    for (let i = 0; i < numberDrawn; i++) {
      if (this.drawPile.length > 0) {
        const drawnCard: Card | undefined = this.drawPile.pop();
        if (drawnCard) {
          this.drawnCards.push(drawnCard);
          if (_.includes(BasePlayerBlessDeck, drawnCard)) {
            console.log('Bless Card Drawn!')
            this.spendBless(drawnCard);
          } else if (_.includes(BaseMonsterCurseDeck, drawnCard)) {
            console.log('Curse Card Drawn!')
            this.spendCurse(drawnCard);
          } else {
            this.discardPile.push(drawnCard);
          }

          if (drawnCard.reshuffle) {
            this.shuffleCardDrawn = true;
          }
        }
      } else {
        console.log('No cards left to draw!!!');
      }
    }

    this.calculateDeckShadow();
  }

  public showPerks(): void {
    this.perksFormVisible = true;
  }

  public closePerks(): void {
    this.perksFormVisible = false;
  }

  public applySelectedPerks(event: any): void {
    this.closePerks();

    console.log('total selected perks: ', event);
    if(event !== undefined) {
      const selectedPerkIds = _.difference(event, this.perks);
      console.log('newly selected perks: ', selectedPerkIds);

      this.perks = event;
      console.log('changed perks: ', this.perks);

      let tempDeck: Deck = {
        class: this.owner,
        deck: this.baseDeck,
        perks: [],
      };

      console.log('tempDeck before changes', tempDeck);

      selectedPerkIds.forEach((id: any) => {
        tempDeck = choosePerk(tempDeck, id);
      });

      console.log('tempDeck after changes',tempDeck);

      this.baseDeck = tempDeck.deck;
      this.resetDeck();
      this.calculateDeckShadow();
      console.log('changed base deck ', this.baseDeck);
    }
  }

  public saveDeck(): void {
    const playerInfo = JSON.stringify({
      class: this.owner,
      deck: this.baseDeck,
      perks: this.perks,
    });
    const playerBlob = new Blob([playerInfo], { type: 'application/octet-stream' });

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
