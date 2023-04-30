import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flippedCard, startGame } from "../redux/counterSlice";
import { Link } from "react-router-dom";

const Gameboard = () => {
  const dispatch = useDispatch();

  const { card, result, defuseCardNumber, cardArray, emoji } = useSelector(
    (state) => state.counter
  );

  return (
    <div className="border-2 rounded-lg ml-10 sm:ml-[25rem] h-[19rem] mb-40 w-[19rem] sm:w-[40rem] ">
      {/* heading */}
      <div>
        <h1 className="text-[20px] mt-4 ml-24 sm:ml-[16rem] font-bold text-white">
          Game Board
        </h1>
      </div>
      <div className="flex my-4">
        {/* card */}
        <div className="ml-1 sm:ml-36">
          <div className="border-2 h-20 w-16 rounded-lg bg-orange-100">
            <p className="ml-[0.65rem] mt-3 text-[30px] ">{emoji}</p>
          </div>
          <span className="w-16">
            <p className="text-white font-semibold align-middle">{card}</p>
          </span>
        </div>
        {/* result */}
        <div className="mt-7 w-16 ml-10 sm:ml-20 font-bold text-white">
          {result}
        </div>
        {/* status */}
        <div className="mt-3 ml-8 sm:ml-20 w-28">
          <div>
            <span className="flex font-bold text-red-600">
              <p>Cards Left: </p>
              <p className="ml-2">{cardArray.length}</p>
            </span>
          </div>
          <div>
            <span className="flex font-bold text-red-600">
              <p>Defuse: </p>
              <p className="ml-2">{defuseCardNumber}</p>
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => dispatch(startGame())}
        className="font-bold border-2 bg-blue-400 text-white w-20 rounded-lg ml-16 sm:ml-[17.5rem]"
      >
        START
      </button>
      <button
        onClick={() => dispatch(flippedCard())}
        className="mt-2 font-bold border-2 bg-blue-400 text-white w-20 rounded-lg sm:ml-[17.5rem]"
      >
        FLIP
      </button>
      <Link to="/leaderboard">
        <button className="font-bold border-2 bg-blue-400 text-white w-32 rounded-lg mt-2 ml-20 sm:ml-[16rem]">
          Leaderboard
        </button>
      </Link>
      {/* Game */}
    </div>
  );
};

export default Gameboard;
