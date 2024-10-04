# JotlDeckToolApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Completed Milestones

- Card details
- Drawing cards
- Shuffle deck (normal shuffle)
- Shuffle deck (reset deck)
- Shuffle deck (Bless/Curse)

## Future Goals

### Pairing/Application Structure

- [x] Come up with separation of responsibilities
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
  
2 - Connect to JOTL image repo
  - Store image path in card property
  
3 - Load deck
  - Load a list of cards
    - Values
    - Image paths
    - Etc.
    
4 - Card pile counts
  - Draw pile
  - Discard pile
  
### Monster modifier deck

4 - Remove ALL Bless/Curse cards
  - [x] Restore deck to "Base Monster Deck"
  - Restore Bless and Curse decks to base
