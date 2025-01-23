# JotlDeckToolApp
The purpose of this app is to streamline the shuffling of attack modifier cards during gameplay. It includes the ability to bless, curse, draw two cards, choose perks, and save/load decks for future sessions. It is written in Angular 18.2.1.

## Requirements
[NodeJs](https://nodejs.org/en)

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
- [x] Able to name your character! -> save filename defaults to character name
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
- [ ] Installation Instructions

### Misc/To Be Sorted
- [ ] jotl submodule does not have base modifier decks for players


# Installation
