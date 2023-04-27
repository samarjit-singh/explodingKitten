import * as types from "../types";
import makeCard from "../cardGenerator";

export const startGame = () => {
  console.log(makeCard);
  return (dispatch) => {
    dispatch({
      type: types.START_GAME,
      payload: makeCard(),
    });
  };
};
