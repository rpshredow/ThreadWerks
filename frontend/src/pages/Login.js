import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import e from "express";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const location = useLocation();

  // const redirect = location.search ? location.search.split("=")[1] : "1";

  // const submitHandler = () => {
  //   e.preventDefault();
  // };

  return (
    <div>
      <h1>Sign In</h1>
      {/* <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <h3>New Customer?</h3>
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Register
        </Link>
      </div> */}
    </div>
  );
};

export default Login;
