import React from "react";
import EmptyCard from "../Cards/EmptyCard";
import { useSelector, useDispatch } from "react-redux";
import { flippedCard, startGame } from "../redux/counterSlice";

import Catcard from "../Cards/Catcard";

const Gameboard = () => {
  const dispatch = useDispatch();

  const { card, result, defuseCardNumber, cardArray } = useSelector(
    (state) => state.counter
  );

  return (
    <div className="border-2 rounded-lg ml-[25rem] h-[12rem] w-[40rem] mt-10 bg-green-100">
      {/* heading */}
      <div>
        <h1 className="text-[20px] ml-[16rem]">Game Board</h1>
      </div>
      <div className="flex ml-[10rem]">
        <div>
          <EmptyCard />
          {/* {card === "Cat Card" ? <EmptyCard /> : <Catcard />} */}
          {/* <p>New Card</p> */}
          <p>{card}</p>
        </div>
        <div className="ml-10 mt-7">{result}</div>
        <div className="mt-3 ml-24">
          <div>
            <span className="flex font-bold text-red-600">
              <p>Cards Left : </p>
              <p className="ml-2">{cardArray.length}</p>
            </span>
          </div>
          <div>
            <span className="flex font-bold text-red-600">
              <p>Defuse : </p>
              <p className="ml-2">{defuseCardNumber}</p>
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => dispatch(startGame())}
        className="font-bold border-2 bg-blue-400 text-white w-20 rounded-lg ml-[17.5rem]"
      >
        START
      </button>
      <button
        onClick={() => dispatch(flippedCard())}
        className="font-bold border-2 bg-blue-400 text-white w-20 rounded-lg ml-[17.5rem]"
      >
        FLIP
      </button>
      {/* Game */}
    </div>
  );
};

export default Gameboard;
