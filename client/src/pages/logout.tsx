import React from "react";
import * as userService from "../services/UserService";
import { useRouter } from "next/router";
import { useAuth } from '../utils/AuthContext';
import styles from "../styles/Home.module.css";

const Logout = () => {
  const router = useRouter();
  const { setAuthState } = useAuth();
  const isOwner = localStorage.getItem("isOwner");

  const handleClick = () => {
    userService.logout();
    setAuthState(null, false, false);
    localStorage.setItem("userId", "");
    localStorage.setItem("isOwner", "");
    localStorage.setItem("isWalker", "");
    router.push("/");
  };

  return (
<div className="container">
  <h2 className={styles.text}>Are you sure you want to log out?</h2>
  <div className="button-container">
    <button
      className="btn-login"
      onClick={() => {
        if (isOwner === "true") {
          router.push("/owneraccount");
        } else {
          router.push("/walkeraccount");
        }
      }}
      aria-label="No, cancel log out"
    >
      No
    </button>
    <button
      className="btn-clicked"
      onClick={handleClick}
      aria-label="Yes, confirm log out"
    >
      Yes
    </button>
  </div>
</div>
  )
};

export default Logout;
