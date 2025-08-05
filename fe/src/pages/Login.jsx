import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{ background: "linear-gradient(to right, #0077A6, #00B59C)" }}
    >
      <div className="cont w-80">
        <div className="flex justify-center my-5">
          <img
            src="/logo_afr.jpg"
            alt="logo"
            className="rounded-2xl border-4 border-gray-300"
            width={80}
          />
        </div>
        <div>
          <form onSubmit={Auth} className="flex flex-col gap-5">
            <h1 className="text-center font-bold text-white">
              Sign In (For AFR only)
            </h1>

            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>

            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>

            <button
              //   type="submit"
              className={"btn uppercase text-white border-2 border-gray-300"}
              style={{
                background: "linear-gradient(to right, #0077A6, #00B59C)",
              }}
              //   disabled={isLoading}
              // onClick={() => navigate("/dashboard")}
            >
              {isLoading ? "Loading..." : "Login"}
              {/* Login */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
