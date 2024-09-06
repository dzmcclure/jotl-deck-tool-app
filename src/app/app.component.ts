import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NewViewComponent } from './new-view/new-view.component';
import { Card } from './models/card';
import { BaseMonsterModifierDeck } from './constants/decks/monster-modifiers-base';
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
  drawPile: Card[] = [];
  discardPile: Card[] = [];
  drawnCards: Card[] = [];

  public constructor() {
    this.drawPile = _.clone(BaseMonsterModifierDeck);

    this.shuffleDeck();
  }

  public shuffleDeck(): void {
    this.drawnCards = [];
    this.discardPile = [];
    this.drawPile = _.clone(BaseMonsterModifierDeck);

    this.shuffle();
    console.log(this.drawPile);
  }

  public drawCard(numberDrawn: number = 1): void {
    this.drawnCards = [];
    for(let i = 0; i < numberDrawn; i++) {
      if (this.drawPile.length > 0) {
        const drawnCard = this.drawPile.pop();
        if (drawnCard) {
          this.discardPile.push(drawnCard);
          this.drawnCards.push(drawnCard);
        }
        console.log(this.discardPile);
      } else {
        console.log('No cards left to draw!!!');
      }
    }
  }

  // public addCard(newCard: number = this.cards.length): void {
  //   console.log('Adding in the new card: ', newCard);
  //   this.cards.push(newCard);
  //   console.log(this.cards);
  // }

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
