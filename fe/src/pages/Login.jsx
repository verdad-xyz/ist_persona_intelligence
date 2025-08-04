import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
          <form className="flex flex-col gap-5">
            <h1 className="text-center font-bold text-white">
              Sign In (For AFR only)
            </h1>

            {/* {error && (
              <div
                role="alert"
                className="alert alert-error alert-outline text-sm"
              >
                <span>{error}</span>
              </div>
            )} */}

            <input
              className="input"
              type="text"
              placeholder="Username"
              //   onChange={(e) => setUsername(e.target.value)}
              //   required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              //   onChange={(e) => setPassword(e.target.value)}
              //   required
            />

            <button
              //   type="submit"
              className={"btn uppercase text-white border-2 border-gray-300"}
              style={{
                background: "linear-gradient(to right, #0077A6, #00B59C)",
              }}
              //   disabled={isLoading}
              onClick={() => navigate("/dashboard")}
            >
              {/* {isLoading ? "Loading..." : "Login"} */}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
