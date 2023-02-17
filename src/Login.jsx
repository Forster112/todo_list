import React from "react";

const Login = () => {
  return (
    <div class="signup hidden">
      <form name="form" action="#">
        <p class="sign">Login</p>
        <p class="p2">
          Email
          <input
            type="email"
            class="enter email--input"
            required
          />
        </p>
        <p class="p2">
          First Name
          <input
            type="text"
            class="enter first--name"
            required
          />
        </p>
        <p class="p2">
          Last Name
          <input
            type="text"
            class="enter last--name"
            required
          />
        </p>
        <br />
        <button type="submit" class="submitForm">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
