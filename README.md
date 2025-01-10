# JotlDeckToolApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

To get all images run `npm run copy:assets` from the src directory

## Completed Milestones
- [x] End of round button - Shuffle all decks that drew shuffle cards during the round

#### Monster Deck
- [x] Card details
- [x] Drawing cards
- [x] Shuffle deck (normal shuffle)
- [x] Shuffle deck (reset deck)
- [x] Shuffle deck (Bless/Curse)
- [x] Card Images!!!
- [x] Deck Image
- [x] Dynamic deck "size"
- [x] Remaining card count
- [x] Come up with separation of responsibilities
- [x] Restore deck to "Base Monster Deck"
- [x] Indicate that a "reshuffle" card was drawn this round
- [x] Discard pile count
- [x] Discard pile view
- [x] Remove ALL Bless/Curse cards
- [x] Restore Bless and Curse decks to base
- [x] Move blurse cards out of deck and into store
#### Player Decks
- [x] Add icons for player symbols
- [x] Add player section/button
- [x] Cannot add/load multiple of the same character
- [x] Load finished
- [x] Able to save a file - guid filename
- [x] Bug fix - Selecting a base class and loading a file are mutually exclusive
#### Perks
- [x] Open dialogue with perk checklist
- [x] Perk utility function
- [x] Perk model and definitions
- [x] Checkboxes check when adding/loading perks
- [x] Dynamic perk lists based on character class
- [x] Perks save correctly
- [x] Submit button locks in checkboxes
- [x] Cancel button closes box without 'applying'
- [x] modal
- [x] descriptions

## Future Goals

### Pairing/Application Structure
- Decks
- Cards
- App UI
- etc.

App Component
- Load a deck
- Player
  - Display decks (child component)
  - 'level up' decks by changing cards and saving new deck
- Monster deck sections
  - Display decks (child component)
  - has separate curses
- Drawn card display (child component)
- Other high-level app info
  - version
- Load/Save a session

Card Component - Takes inputs from the model
- displays a card image

Card Class - Model
- reshuffle/draw one flags

Deck Component
- image of deck (card back)
- count of remaining cards
- maybe some buttons
  - draw a card


### All decks
- [ ] Save new deck
  - [ ] pick file name - for windows/browser

### Misc/To Be Sorted
- [ ] jotl submodule does not have base modifier decks for players
