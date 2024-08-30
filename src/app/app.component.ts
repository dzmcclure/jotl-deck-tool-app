import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NewViewComponent } from './new-view/new-view.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, NewViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title: string = 'jotl-deck-app';
  times: number = 1;
  boxStyle = 'width: 15px; height: 15px; background-color: blue;'
  boxWidth = 25;
  cards: number[] = [];
  newCardValue!: number;

  public constructor() {
    for(var numCards = 0; numCards < 20; numCards++) {
      this.cards.push(numCards);
    }

    console.log(this.cards);
  }

  public shuffleDeck(times: number = 1): void {
    console.log (`Shuffled ${times} times!`);

    this.times = this.times + times;
    console.log(`We have shuffled ${this.times} in total.  YOU MADMAN!!!!`)

    this.shuffle();
    console.log(this.cards);
  }

  public addCard(newCard: number = this.cards.length): void {
    console.log('Adding in the new card: ', newCard);
    this.cards.push(newCard);
    console.log(this.cards);
  }

  // Stolen from the internet ty internet
  private shuffle(): void {
    let currentIndex = this.cards.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex], this.cards[currentIndex]];
    }
  }
}
