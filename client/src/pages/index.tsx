import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Login from "../components/login";
import Register from "../components/register";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("login");

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <Head>
        <title>Walky Doggy | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1 className={styles.title}>Home</h1>
        <section className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.homeImage}
              src="/homepage2.jpeg"
              alt="Man with dog"
              width={323.12}
              height={554.4}
              priority
            />
          </div>
          <div className={styles.contentContainer}>
            <p className={styles.text}>
              Give your dogs all the care and comfort they need and assist you in the busy life.
            </p>
            <div className={styles.loginContainer}>
              <div className={styles.tabButtons} role="tablist">
                <button
                  className={`${styles.button} ${currentTab === "login" ? styles.buttonselected : ""}`}
                  onClick={() => {
                    handleTabChange("login");
                  }}
                  role="tab"
                  aria-selected={currentTab === "login" ? "true" : "false"}
                  aria-controls="login-tab"
                >
                  Login
                </button>
                <button
                  className={`${styles.button} ${currentTab === "register" ? styles.buttonselected : ""}`}
                  onClick={() => {
                    handleTabChange("register");
                  }}
                  role="tab"
                  aria-selected={currentTab === "register" ? "true" : "false"}
                  aria-controls="register-tab"
                >
                  Register
                </button>
              </div>
              <div className={styles.tabContent} role="tabpanel" aria-labelledby={currentTab === "login" ? "login-tab" : "register-tab"}>
                {currentTab === "login" ? <Login /> : <Register />}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
