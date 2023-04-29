import React, { useState, useEffect } from "react";
import Catcard from "../Cards/Catcard";
import Defusecard from "../Cards/Defusecard";
import Explodecard from "../Cards/Explodecard";
import Shufflecard from "../Cards/Shufflecard";
import Gameboard from "../components/Gameboard";
import { useSelector } from "react-redux";
import { updateScoreRoute } from "../utils/APIRoutes";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { score } = useSelector((state) => state.counter);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [userScore, setUserScore] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("app-user")) {
      navigate("/login");
    } else {
      const fetchCurrentUser = async () => {
        const data = JSON.parse(localStorage.getItem("app-user"));
        setCurrentUser(data.user);
        setUserScore(data.gameWon);
      };
      fetchCurrentUser();
      // console.log("current user " + currentUser);
    }
  }, [navigate]);

  useEffect(
    (event) => {
      const updateScore = async () => {
        const newScore = score + userScore;
        const username = currentUser;
        const Score = newScore;
        const { data } = await axios.post(updateScoreRoute, {
          username,
          Score,
        });
        console.log("updated score" + data);
      };
      updateScore();
    },
    [score]
  );

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
            <p className="ml-2 font-bold text-purple-700">{currentUser}</p>
          </span>
          <span className="flex">
            <p className="font-semibold">Score:</p>
            <p className="ml-2 font-bold text-purple-700">
              {userScore + score}
            </p>
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
