import {CommonModule} from '@angular/common';
import {Component, ViewContainerRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {NewViewComponent} from './new-view/new-view.component';
import {DeckComponent} from './components/deck/deck.component';
import {BaseMonsterModifierDeck} from './constants/decks';
import _ from 'lodash';
import {Deck} from './models/deck';

interface CharacterClassList {
  demolitionist: boolean;
  hatchet: boolean;
  redGuard: boolean;
  voidwarden: boolean;
}

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

  addPlayerDialogVisible = false;
  monsterDeck = _.clone(BaseMonsterModifierDeck);
  playerCount = 0;
  selectedClass = '';
  loadedClasses: CharacterClassList = {
    demolitionist: false,
    hatchet: false,
    redGuard: false,
    voidwarden: false,
  };
  loadedDeck: Deck | null = null;

  constructor(private viewContainer: ViewContainerRef) {
    // Intentionally left blank
  }
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

  public selectClass(characterClass: keyof CharacterClassList): void {
    this.selectedClass = !this.loadedClasses[characterClass] ? characterClass : '';
  }

  public addPlayer(): void {
    if (this.selectedClass !== '') {
      console.log('adding a player');
      this.addPlayerDialogVisible = true;
      this.playerCount++;
      const newDeckComponent = this.viewContainer.createComponent(DeckComponent);
      newDeckComponent.instance.baseDeck = _.clone(BaseMonsterModifierDeck);

      newDeckComponent.instance.owner = this.selectedClass;
      this.loadedClasses[this.selectedClass as keyof CharacterClassList] = true;
      this.selectedClass = '';
    }
  }

  public async loadDeck(event: any): Promise<void> {
    console.log('loading a deck:');
    this.loadedDeck = JSON.parse(await event.target.files[0].text());
    // TODO: Load file into a deck thing, set class, figure out perks
    // TODO: How do we tell this is a valid JSON deck file?
  }
}
