import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../component/layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://abcl-server.vercel.app/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    // console.log(name, email, phone, password, address);
    // toast.success("Register Successfully")
    // Clear the form fields
    setEmail("");
    setPassword("");
  };
  return (
    <Layout title="Login">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1 className=" title">Please Login</h1>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="text-center pt-1 mb-2 pb-1">
            {/* <button
              type="submit"
              className="w-100 btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button> */}
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="w-100 btn btn-primary rounded-2"
            style={{
              backgroundImage: "linear-gradient(to right, #ff6a00, #ee0979)",
              color: "white",
              border: "1px solid white",
              transition: "color 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.color = "black")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Login
          </button>

          <div className="d-flex align-items-center justify-content-center pb-2 mb-2">
            <p className="mt-2">Don't have an account?</p>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="btn btn-outline-light rounded-2 w-auto"
              style={{
                backgroundImage: "linear-gradient(to right, #ff6a00, #ee0979)",
                color: "white",
                border: "1px solid white",
                transition: "color 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.color = "black")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
