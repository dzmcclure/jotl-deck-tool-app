import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: "root",
})

export class ShuffleDecks {
  public shuffleCardDrawnSignal: WritableSignal<boolean> = signal(false);
}
