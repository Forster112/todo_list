import React from "react";

import './styles/login.css'

const Login = () => {
  return (
    <>
      <div class="signup">
        <form name="form" action="#">
          <p class="login-text">Login</p>
          <div class="user--data">
            Email:
            <input
              type="email"
              class="input email--input"
              required
            />
          </div>
          <div class="user--data">
            First Name:
            <input
              type="text"
              class="input first--name"
              required
            />
          </div>
          <div class="user--data">
            Last Name:
            <input
              type="text"
              class="input last--name"
              required
            />
          </div>
          <br />
          <button
            type="submit"
            class="submitForm"
          >
            Login
          </button>
        </form>
      </div>
      <div class="overlay"></div>
    </>
  );
};

export default Login;
