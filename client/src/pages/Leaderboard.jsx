import React, { useState, useEffect } from "react";
import { leaderboardRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("app-user")) {
      navigate("/login");
    } else {
      const getData = async () => {
        try {
          const response = await axios.get(leaderboardRoute);
          const userArray = Object.values(response.data).map((userData) => ({
            user: userData.user,
            gameWon: userData.gameWon,
          }));
          setUsers(userArray);
          console.log(users);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="w-[100%] h-[100vh] sm:w-[216vh] relative flex justify-center align-middle bg-[#131324]">
        <div className="absolute">
          <h1 className="font-bold text-[30px] mt-10 text-white">
            Leaderboard
          </h1>
          <div>
            {users.length > 0 ? (
              <ul className="mt-10">
                {users.map((user, index) => (
                  <li key={index} className="border-2 flex rounded-lg p-1  mt-5">
                    <span className="text-white w-20 font-bold">
                      <p>{user.user}</p>
                    </span>
                    <span className="text-white font-bold ml-12 w-10">
                      <p>{user.gameWon}</p>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
