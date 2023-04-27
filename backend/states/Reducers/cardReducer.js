import * as types from "../types";

const initialState = {
  cardArray: [],
  cardFlipped: "Flip the Card",
  defuseCardNumber: 0,
  res: "",
};

const reducer = (state = initialState, action) => {
  if (action.type === types.START_GAME) {
    return {
      ...state,
      cardArray: action.payload,
      cardFlipped: "Flip the Card",
      defuseCardNumber: 0,
      res: "New Cards Added",
    };
  } else if (action.type === types.FLIPPED_CARD) {
    const { cardFlipped } = action.payload;
    return { ...state, cardFlipped };
  } else if (action.type === types.REMOVE_CARD) {
    const { cardArray } = action.payload;
    console.log(cardArray);
    return { ...state, cardArray };
  } else if (action.type === types.DEFUSE_CARD) {
    const { defuseCardNumber, res } = action.payload;
    return { ...state, defuseCardNumber, res };
  } else if (action.type === types.CAT_CARD) {
    return { ...state, res: "Safe For Now" };
  } else if (action.type === types.SHUFFLE_CARD) {
    return { ...state, res: "Cards Will be Shuffled Again" };
  } else if (action.type === types.GAME_OVER) {
    return { ...state, res: "GAME LOST, will be restarted in 2 seconds" };
  } else if (action.type === types.GAME_WON) {
    return { ...state, res: "GAME WON, will be restarted in 2 seconds" };
  } else {
    return state;
  }
};

export default reducer;
