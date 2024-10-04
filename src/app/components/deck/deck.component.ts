import { Component } from '@angular/core';
import { ModifierCardBack } from '../../constants/cards/modifier-card-back';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})

export class DeckComponent {

cardBackImage: string = ModifierCardBack.image;
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
// - end of encounter "reset" - load deck?

  
}
