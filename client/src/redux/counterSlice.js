import { createSlice } from "@reduxjs/toolkit";
import * as types from "./types";
import makeCard from "./cardGenerator";

// startGame is an action

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    cardArray: [],
    cardFlipped: "Flip the Card",
    defuseCardNumber: 0,
    card: "NEW CARDS",
    result: "",
    score: 0,
    emoji: "🃏",
  },
  reducers: {
    startGame: (state) => {
      state.cardArray = makeCard();
      state.cardFlipped = "Flip";
      state.defuseCardNumber = 0;
      state.result = "RESULT";
      state.card = "NEW CARDS";
      state.emoji = "🃏";
      console.log(state.cardArray);
    },
    flippedCard: (state, action) => {
      let cards = state.cardArray.pop();
      state.card = cards;
      if (state.card === "KITTEN") {
        state.result = "SAFE";
        state.emoji = "😸";
      } else if (state.card === "DEFUSE") {
        state.emoji = "🙅‍♂️";
        state.defuseCardNumber += 1;
        state.result = "DEFUSE";
      } else if (state.card === "EXPLODE") {
        state.emoji = "💣";
        if (state.defuseCardNumber > 0) {
          state.defuseCardNumber -= 1;
          state.result = "Added Defused Card";
        } else {
          state.result = "GAME OVER";
          state.cardArray = makeCard();
        }
      } else if (state.card === "Shuffle card") {
        state.emoji = "🔀";
        state.result = "START AGAIN";
        state.defuseCardNumber = 0;
        state.cardArray = makeCard();
      } else if (state.cardArray.length === 0) {
        state.defuseCardNumber = 0;
        state.cardArray = makeCard();
        state.result = "RESULT";
        state.card = "NEW CARDS";
        state.score += 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startGame,
  flippedCard,
  removeCard,
  defuseCard,
  catCard,
  shuffleCard,
  gameOver,
  gameresultult,
} = counterSlice.actions;

export const flipCard = () => (dispatch, getState) => {
  const { cardArray, defuseCardNumber } = getState().card;
  const card = cardArray[cardArray.length - 1];
  dispatch(flippedCard({ cardFlipped: card }));
  if (card === "Cat card") dispatch(catCard());
  if (card === "Defuse card")
    dispatch(defuseCard({ defuseCardNumber: 1, result: "Added Defuse Card" }));
  if (card === "Exploding kitten card") {
    if (defuseCardNumber !== 0)
      dispatch(
        defuseCard({ defuseCardNumber: -1, result: "Defuse Card Used" })
      );
    else {
      dispatch(gameOver());
      setTimeout(() => dispatch(startGame()), 2000);
    }
  }
  if (card === "Shuffle card") {
    dispatch(shuffleCard());
    setTimeout(() => dispatch(startGame()), 1300);
  }
  if (cardArray.length === 0) {
    dispatch(gameresultult());
    setTimeout(() => dispatch(startGame()), 2000);
  }
  dispatch(removeCard());
};

export default counterSlice.reducer;
