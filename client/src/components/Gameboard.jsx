import React from "react";
import EmptyCard from "../Cards/EmptyCard";

const Gameboard = () => {
  return (
    <div className="border-2 rounded-lg ml-[25rem] h-[12rem] w-[40rem] mt-10 bg-green-100">
      {/* heading */}
      <div>
        <h1 className="text-[20px] ml-[16rem]">Game Board</h1>
      </div>
      <div className="flex ml-[10rem]">
        <div>
          <EmptyCard />
          <p>New Card</p>
        </div>
        <div className="mt-3 ml-40">
          <div>
            <span className="flex font-bold text-red-600">
              <p>Cards Left : </p>
              <p className="ml-2">5</p>
            </span>
          </div>
          <div>
            <span className="flex font-bold text-red-600">
              <p>Defuse : </p>
              <p className="ml-2">5</p>
            </span>
          </div>
        </div>
      </div>
      <button className="font-bold border-2 bg-blue-400 text-white w-20 rounded-lg ml-[17.5rem]">FLIP</button>
      {/* Game */}
    </div>
  );
};

export default Gameboard;
