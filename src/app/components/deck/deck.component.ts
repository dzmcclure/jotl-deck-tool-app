import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModifierCardBack} from '../../constants/cards/modifier-card-back';
import {CardComponent} from '../card/card.component';
import {Card} from '../../models/card';
import _ from 'lodash';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {BlurseDecks} from '../../service/blurse.service';
import {ShuffleDecks} from '../../service/shuffle.service';
import {monsterIcon, playerIcons} from '../../constants/variables';
import {choosePerk} from '../../service/perk.service';
import {Deck} from '../../models/deck';
import {PerksListComponent} from '../perks-list/perks-list.component';
import {BaseMonsterCurseDeck, BasePlayerBlessDeck} from '../../constants/decks';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    CardComponent,
    NgClass,
    FormsModule,
    PerksListComponent,
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})

export class DeckComponent implements OnInit {
  @Input({required: true}) baseDeck: Card[] = [];
  @Input({required: true}) owner!: string;
  @Input() perks: string[] = [];
  @Input() name: string = '';

  cardBackImage: string = ModifierCardBack.image;

  deckRemainderSizeStyle = '';
  shuffleCardDrawn = false;
  iconSrc: string = '';

  // Draw/Discard Piles
  drawPile: Card[] = [];
  discardPile: Card[] = [];
  drawnCards: Card[] = [];

  // form
  perksFormVisible = false;

  public constructor(public blurseDeckService: BlurseDecks,
                     public shuffleDeckService: ShuffleDecks) {
    // Intentionally left blank
  }

  ngOnInit(): void {
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
    this.drawnCards = [];
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
            this.shuffleDeckService.shuffleCardDrawnSignal.set(this.shuffleCardDrawn);
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

    if (event !== undefined) {
      const selectedPerkIds = _.difference(event, this.perks);

      this.perks = event;

      let tempDeck: Deck = {
        name: this.name,
        character: this.owner,
        deck: this.baseDeck,
        perks: [],
      };

      selectedPerkIds.forEach((id: any) => {
        tempDeck = choosePerk(tempDeck, id);
      });

      this.baseDeck = tempDeck.deck;
      this.resetDeck();
      this.calculateDeckShadow();
    }
  }

  public saveDeck(): void {

    const playerInfo: Deck = {
      name: this.name,
      character: this.owner,
      deck: this.baseDeck,
      perks: this.perks,
    };
    const playerBlob = new Blob([JSON.stringify(playerInfo)], {type: 'application/json'});
    const url = window.URL.createObjectURL(playerBlob);
    const downloadLink = document.createElement('a');

    downloadLink.href = url;
    const fileName = this.name.replace(/\W/g, '');
    downloadLink.download = fileName ? `${fileName}.json` : `${this.owner}.json`;
    downloadLink.click();

    window.URL.revokeObjectURL(url);
  }

  public endOfRound(): void {
    console.log(`**End of round called for ${this.owner}**`);
    if (this.shuffleCardDrawn) {
      this.returnDiscardsToDeck();
    }
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
