import { Component, Input, OnInit } from '@angular/core';
import { ModifierCardBack } from '../../constants/cards/modifier-card-back';
import { CardComponent } from '../card/card.component';
import { Card } from '../../models/card';
import _ from 'lodash';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { BlurseDecks } from '../../service/deck.service';
import { monsterIcon, playerIcons } from '../../constants/variables';
import { choosePerk } from "../../service/perk.service";
import { Deck } from "../../models/deck";
import * as perkList from "../../constants/perks";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CardChanges } from "../../models/perk";

interface PerkChecklist extends CardChanges {
  perkId: string;
}

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    CardComponent,
    NgOptimizedImage,
    NgClass,
    ReactiveFormsModule,
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

  // form
  form: FormGroup;
  availablePerks: PerkChecklist[] = [];
  perksFormVisible = false;

  get perkFormArray() {
    return this.form.controls['perks'] as FormArray;
  }

  public constructor(public blurseDeckService: BlurseDecks,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      perks: new FormArray([]),
    });
  }

  ngOnInit(): void {
    console.log('owner: ', this.owner);
    console.log('starting deck: ', this.baseDeck);
    this.iconSrc = playerIcons[this.owner] ?? monsterIcon;

    this.initPerks();
    this.resetDeck();
    this.calculateDeckShadow();
    // form init
    this.availablePerks.forEach((availablePerk) => {
      this.perkFormArray.push(new FormControl(_.includes(this.perks, availablePerk.perkId)))
    });
  }

  private initPerks(): void {

    let characterPerks: Record<string, CardChanges> = {};

    switch (this.owner) {
      case 'demolitionist':
        characterPerks = _.cloneDeep(perkList.DemolitionistPerks);
        break;
      case 'hatchet':
        characterPerks = _.cloneDeep(perkList.HatchetPerks);
        break;
      case 'redGuard':
        characterPerks = _.cloneDeep(perkList.RedguardPerks);
        break;
      case 'voidwarden':
        characterPerks = _.cloneDeep(perkList.VoidwardenPerks);
        break;
    }

    Object.entries(characterPerks).map((perk) => {
      this.availablePerks.push({
        ...perk[1],
        perkId: perk[0],
      });
    });
    console.log('Available Perks: ', this.availablePerks);

    
  }

  submit() {
    console.log('submit');
    const selectedPerkIds =
      this.form.value.perks
        .map((value: any, index: any) => value ? this.availablePerks[index].perkId : null)
        .filter((value: any) => value !== null);
    console.log('selected perks ', selectedPerkIds);
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

    this.baseDeck = tempDeck.deck; // clone deep? DEEEEEP?
    this.perks = tempDeck.perks;
    this.resetDeck();
    this.calculateDeckShadow();
    console.log('changed base deck ', this.baseDeck);
    console.log('changed perks ', this.perks);
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
      if (card.description.includes('Bless')) {
        this.spendBless(card);
      } else if (card.description.includes('Curse')) {
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
      } else {
        console.log('No cards left to draw!!!');
      }
    }

    this.calculateDeckShadow();
  }

  public pickPerk(): void {
    this.perksFormVisible = true;

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
