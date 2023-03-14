import React, { useState } from "react";
import auth from "../utils/auth";
import userService from "../Services/UserService";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  username: "",
  email: "",
  password: "",
  isOwner: false,
  isWalker: false,
};

const Register = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isOwner, isWalker, username, email, password } = state;
    const user = { isOwner, isWalker, username, email, password };
    const res = await userService.register(user);
    console.log(res);
    const errorToast = () => toast(res.message);
    if (res.error) {
      errorToast();
      setState(initialState);
    } else {
      // localStorage.setItem("userId", res.userId);
      const userId = res._id;
      const isOwner = res.isOwner;
      const isWalker = res.isWalker;
      localStorage.setItem("userId", userId);
      localStorage.setItem("isOwner", isOwner);
      localStorage.setItem("isWalker", isWalker);
      if (res.isOwner) {
        auth.login(() => router.push("/owneraccount"));
      } else auth.login(() => router.push("/walkeraccount"));
    }
  };

  const validateForm = () => {
    return (
      !(state.isOwner || state.isWalker) ||
      !state.username ||
      !state.email ||
      !state.password
    );
  };

  return (
    <section>
      <div className="form-control" style={{ textAlign: "center" }}>
        <form className="add-form" onSubmit={handleSubmit}>
          <label style={{ display: "inline-block", textAlign: "center" }}>
            Dog Owner
            <input
              type="checkbox"
              name="isOwner"
              checked={state.isOwner}
              onChange={handleCheckChange}
            />
          </label>
          <label style={{ display: "inline-block" }}>
            <span>Dog Walker</span>
            <input
              type="checkbox"
              name="isWalker"
              checked={state.isWalker}
              onChange={handleCheckChange}
            />
          </label>
          <label>
            Username
            <input
              type="text"
              placeholder="username"
              name="username"
              value={state.username}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label>
            E-mail
            <input
              type="text"
              placeholder="name@mail.com"
              name="email"
              value={state.email}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="******"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </label>
          <div className="login-container">
            <button
              className="btn-clicked"
              type="submit"
              disabled={validateForm()}
            >
              Register
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Register;