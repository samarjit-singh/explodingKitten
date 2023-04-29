import React, { useState, useEffect } from "react";
import { userRoute } from "../utils/APIRoutes";
import { loginRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
  });

  useEffect(() => {
    if (localStorage.getItem("app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username } = values;
      const { data } = await axios.post(loginRoute, { username });
      console.log(data);
      if (data.status === false) {
        console.log(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("app-user", JSON.stringify(data.value));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username } = values;
    if (username.length === "") {
      alert("Username is required");
      return false;
    }
    return true;
  };

  // for taking values from the input fields
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-[100vh] w-[100vw] inline-flex justify-center align-middle gap-[1rem] bg-[#131324]">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-col h-[20vh] w-[80vw] sm:h-[30vh] sm:w-[30vw] mt-40  gap-[2rem] bg-white rounded-lg border-2 p-2"
      >
        <div className="flex align-middle gap-[1rem] justify-center">
          <h1 className="font-semibold">😸 Exploding Kitten</h1>
        </div>
        <input
          type="text"
          placeholder="Enter you name"
          name="username"
          onChange={(e) => handleChange(e)}
          min="3"
          className="bg-transparent p-1 border-2 border-[#4e0eff] rounded-lg"
        />

        <button
          type="submit"
          className="bg-[#4e0eff] text-white p-2 border-none cursor-pointer rounded-lg font-thin hover:bg-[#997af0]"
        >
          Join Game
        </button>
      </form>
    </div>
  );
};

export default Login;
