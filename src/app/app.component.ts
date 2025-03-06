import {CommonModule} from '@angular/common';
import {
  Component,
  ComponentRef,
  effect,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DeckComponent} from './components/deck/deck.component';
import {BaseMonsterModifierDeck} from './constants/decks';
import _ from 'lodash';
import {Deck} from './models/deck';
import {ShuffleDecks} from './service/shuffle.service';

interface loadedDeckData {
  componentRef: ComponentRef<DeckComponent> | null;
  loaded: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DeckComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  @ViewChild('deckComponent', {read: ViewContainerRef}) deckComponent!: ViewContainerRef;
  @ViewChild('loadedClass') loadedClassInput!: ElementRef;
  @ViewChild('monsterDeckComponent') monsterDeckComponent!: DeckComponent;
  title: string = 'Jaws Of The Lion - Deck Helper';
  version: string = 'v1.0.0-beta1';

  addPlayerDialogVisible = false;
  shuffleCardDrawnGlobally = false;
  monsterDeck = _.clone(BaseMonsterModifierDeck);
  playerCount = 0;
  selectedClass = '';
  loadedClasses: Map<string, loadedDeckData> = new Map(
    [
      ['demolitionist', {componentRef: null, loaded: false}],
      ['hatchet', {componentRef: null, loaded: false}],
      ['redGuard', {componentRef: null, loaded: false}],
      ['voidwarden', {componentRef: null, loaded: false}],
    ]);
  loadedDeck: Deck | null = null;

  constructor(private viewContainer: ViewContainerRef,
              public shuffleDeckService: ShuffleDecks) {
    effect(() => {
      this.shuffleCardDrawnGlobally = shuffleDeckService.shuffleCardDrawnSignal();
    });
  }

  public selectClass(characterClass: string): void {
    if (this.loadedClasses.get(characterClass)?.loaded === false) {
      this.selectedClass = characterClass;
      this.loadedDeck = null;
      this.loadedClassInput!.nativeElement.value = '';
    } else {
      console.log('Error selecting a base class.');
    }
  }

  public addPlayer(): void {
    if (this.selectedClass !== '') {
      this.addPlayerDialogVisible = true;
      this.playerCount++;
      const newDeckComponent = this.deckComponent.createComponent(DeckComponent);

      newDeckComponent.instance.baseDeck = this.loadedDeck?.deck ?? _.clone(BaseMonsterModifierDeck);
      newDeckComponent.instance.name = this.loadedDeck?.name ?? '';
      newDeckComponent.instance.owner = this.selectedClass;
      newDeckComponent.instance.perks = this.loadedDeck?.perks ?? [];
      const newDeckData: loadedDeckData = {componentRef: newDeckComponent, loaded: true};
      this.loadedClasses.set(this.selectedClass, newDeckData);

      this.selectedClass = '';
      this.loadedDeck = null;
    }
  }

  public async loadDeck(event: any): Promise<void> {
    this.loadedDeck = JSON.parse(await event.target.files[0].text());
    const characterClass = this.loadedDeck!.character;
    this.selectedClass = !this.loadedClasses.get(characterClass)?.loaded ? characterClass : '';
  }

  public endOfRound(): void {
    this.monsterDeckComponent.endOfRound();
    this.loadedClasses.forEach((loadedClass) => {
      loadedClass.componentRef?.instance.endOfRound()
    });
    this.shuffleDeckService.shuffleCardDrawnSignal.set(false);
  }
}
