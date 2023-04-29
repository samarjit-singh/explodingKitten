import { createSlice } from "@reduxjs/toolkit";
import makeCard from "./cardGenerator";

// startGame is an action

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    cardArray: [],
    defuseCardNumber: 0,
    card: "CARDS",
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
      state.card = "CARDS";
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
          state.result = "DEFUSED";
        } else {
          state.result = "GAME OVER";
          state.cardArray = makeCard();
        }
      } else if (state.card === "SHUFFLE") {
        state.emoji = "🔀";
        state.result = "START AGAIN";
        state.defuseCardNumber = 0;
        state.cardArray = makeCard();

        console.log("Hello world!");
      } else if (state.cardArray.length === 0) {
        state.defuseCardNumber = 0;
        state.cardArray = makeCard();
        state.result = "GAME WON";
        state.card = "CARDS";
        state.score += 1;
        state.emoji = "🃏";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { startGame, flippedCard } = counterSlice.actions;

// export const flipCard = () => (dispatch, getState) => {
//   const { cardArray, defuseCardNumber } = getState().card;
//   const card = cardArray[cardArray.length - 1];
//   dispatch(flippedCard({ cardFlipped: card }));
//   if (card === "Cat card") dispatch(catCard());
//   if (card === "Defuse card")
//     dispatch(defuseCard({ defuseCardNumber: 1, result: "Added Defuse Card" }));
//   if (card === "Exploding kitten card") {
//     if (defuseCardNumber !== 0)
//       dispatch(
//         defuseCard({ defuseCardNumber: -1, result: "Defuse Card Used" })
//       );
//     else {
//       dispatch(gameOver());
//       setTimeout(() => dispatch(startGame()), 2000);
//     }
//   }
//   if (card === "Shuffle card") {
//     dispatch(shuffleCard());
//     setTimeout(() => dispatch(startGame()), 1300);
//   }
//   if (cardArray.length === 0) {
//     dispatch(gameresultult());
//     setTimeout(() => dispatch(startGame()), 2000);
//   }
//   dispatch(removeCard());
// };

export default counterSlice.reducer;
