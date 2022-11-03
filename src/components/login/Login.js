import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let [authMode, setAuthMode] = useState("signin");
  let navigate = useNavigate();
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSumbit = () => {
    navigate("/dashboard");
  };
  if (authMode === "signin") {
    return (
      <div class="h-screen flex">
        <div
          class="hidden lg:flex w-full lg:w-1/2 bg-gray-500
          justify-around items-center"
        >
          <div
            class=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
          ></div>
          <div class="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 class="text-white font-bold text-4xl font-sans">PolicyMaker</h1>
            <p class="text-white mt-1">The simplest app to use</p>
          </div>
        </div>
        <div class="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div class="w-full px-8 md:px-32 lg:px-24">
            <form class="bg-white rounded-md shadow-2xl p-5">
              <h1 class="text-gray-800 font-bold text-2xl mb-1">PolicyMaker</h1>
              <p class="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
              <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <span>
                  <i className="fas fa-envelope text-gray-400" />
                </span>
                <input
                  id="email"
                  class=" pl-2 w-full outline-none border-none"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                />
              </div>
              <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <span>
                  <i className="fas fa-lock text-gray-400" />
                </span>
                <input
                  class="pl-2 w-full outline-none border-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <button
                onClick={handleSumbit}
                class="block w-full bg-gray-700 mt-5 py-2 rounded-2xl hover:bg-gray-500 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </div>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
