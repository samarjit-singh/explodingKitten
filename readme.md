# Project Name

###😸 Exploding Kitten 

## Getting Started

A single player Exploding Kitten Game written in React.js, Node.js, Express.js & Redis.

## Installation

### Exploding Kitten Game Client

```terminal
$ npm install
$ npm start
```

### Exploding Kitten Game Backend

For running the server application you need to install reddis client in your machine. The current implemention expects the redis to install running machine with default `port` & `URL`.

```terminal
$ npm install
$ nodemon
```


## Usage

- There will be a button to start the game. Once the game is started, a deck of five cards will be randomly ordered.
- When the user clicks on the "Flip" button, a card will pop up from the deck of five cards, and it will be handled in the following manner:
    - If the drawn card is a cat card, it will be removed from the deck.
    - If the drawn card is an exploding kitten (bomb), the player will lose the game.
    - If the drawn card is a defusing card, it will be removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
    - If the drawn card is a shuffle card, the game will restart, and the deck will be refilled with five cards again.
