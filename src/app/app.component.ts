import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {NewViewComponent} from './new-view/new-view.component';
import {DeckComponent} from './components/deck/deck.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    NewViewComponent,
    DeckComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title: string = 'jotl-deck-app';
  version: string = 'v0.2';
  // - Load a deck
  // - Save a Deck
  // - Player
  //   - Display decks (child component)
  //   - 'level up' decks by changing cards and saving new deck
  // ✓ Monster deck section
  //   ✓ Display deck (child component)
  //   ✓ has separate curses
  // - End round (trigger all shuffles if needed)
  // - End of encounter 'reset' - (reset store, trigger all deck resets/loads)
  // - Drawn card display (child component)
  // - Other high-level app info
  //   - version
  // - Load/Save a session

// all shared pieces in parent, observables
//    -> when action on child, send up to parent

// ✓ store


}
