import React from "react";
import Catcard from "../Cards/Catcard";
import Defusecard from "../Cards/Defusecard";
import Explodecard from "../Cards/Explodecard";
import Shufflecard from "../Cards/Shufflecard";
import Gameboard from "../components/Gameboard";
import { useSelector } from "react-redux";

const Home = () => {
  const { score } = useSelector((state) => state.counter);
  return (
    <div>
      {/* header */}
      <div className="flex flex-col h-[40vh] w-[100vw] justify-evenly">
        <div>
          <h1 className="font-bold text-[30px] ml-[35rem]">
            😸 Exploding Kitten
          </h1>
          <div className="flex gap-2 ml-[35.4rem] mt-10">
            <Catcard />
            <Defusecard />
            <Explodecard />
            <Shufflecard />
          </div>
        </div>
        {/* leader board */}
        <div className="ml-[70rem]">
          <span className="flex">
            <p className="font-semibold">Hello</p>
            <p className="ml-2 font-bold text-purple-700">Samarjit</p>
          </span>
          <span className="flex">
            <p className="font-semibold">Score:</p>
            <p className="ml-2 font-bold text-purple-700">{score}</p>
          </span>
        </div>
        <div></div>
      </div>
      {/* main game */}
      <div>
        <Gameboard />
      </div>
    </div>
  );
};

export default Home;
