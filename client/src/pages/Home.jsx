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
    }
  }, [navigate]);

  useEffect((event) => {
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
  }, []);

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="overflow-hidden">
      {/* header */}
      <div className="flex flex-col h-[100vh] w-[300vh] sm:h-[100vh] sm:w-[100vw] justify-evenly bg-[#131324]">
        <div>
          <span>
            <p
              onClick={handleClick}
              className="ml-80 sm:ml-[70rem] sm:mt-4 cursor-pointer"
            >
              ❌
            </p>
            <h1 className="font-bold text-[30px] ml-12 sm:ml-[35rem] text-white">
              😸 Exploding Kitten
            </h1>
          </span>
          <div className="flex gap-2 ml-12 sm:ml-[35.4rem] mt-10">
            <Catcard />
            <Defusecard />
            <Explodecard />
            <Shufflecard />
          </div>
        </div>
        {/* leader board */}
        <div className="ml-12 sm:ml-[70rem]">
          <span className="flex">
            <p className="font-semibold text-white">Hello</p>
            <p className="ml-2 font-bold text-purple-700">{currentUser}</p>
          </span>
          <span className="flex">
            <p className="font-semibold text-white">Score:</p>
            <p className="ml-2 font-bold text-purple-700">
              {userScore + score}
            </p>
          </span>
          
        </div>
        {/* main game */}
        <div>
          <Gameboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
