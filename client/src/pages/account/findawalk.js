import Head from "next/head";
import WalkList from "../../components/Walklist";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import * as WalkService from "../../services/WalkService";

const findawalk = () => {
  const [futureWalks, setFutureWalks] = useState([]);

  useEffect(() => {
    WalkService.getWalks().then((walks) => {
      setFutureWalks(walks.future);
    });
  }, []);

  const deleteWalk = async (_id) => {
    await WalkService.deleteWalk(_id);
    const updatedArray = futureWalks.filter((walk) => walk._id !== _id);
    setFutureWalks(updatedArray);
  };

  return (
    <>
      <Head>
        <title>Walky Doggy | Walker</title>
      </Head>
      <h1 className={styles.title}>Find a walk</h1>
      <WalkList walks={futureWalks} onDelete={deleteWalk} formPath="/form/" />
    </>
  );
};

export default findawalk;
