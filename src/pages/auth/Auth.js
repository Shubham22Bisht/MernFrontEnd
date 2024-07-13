import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

export const Auth = () => {
  return (
    <div className="auth">
      <ToastContainer />
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        username,
        password
      });

      if (response?.data?.message === "User does not exist") {
        toast.error("Username does not Exist");
      } else if (response?.data?.message === "Username or Password Invalid") {
        toast.error("Wrong Username or Password. Try Again!");
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        toast.success("Login Successful!");
        setTimeout(()=>{
          navigate("/explore");
        },1000);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label={"Login"}
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, {
        username,
        password
      });
      if (response?.data?.message === "User already exists") {
        toast.error("Username occupied! Please try another username");
      } else {
        toast.success("Registration Completed! Please Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label={"Register"}
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2 className="form-label">{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button className="submit-button" type="submit">{label}</button>
      </form>
    </div>
  );
};
