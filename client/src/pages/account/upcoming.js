import WalkList from "../../components/Walklist";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import * as WalkService from "../../services/WalkService";

//this only exists for the owner
const upcoming = () => {
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
      <h1 className={styles.title}>Walks Schedule</h1>
      <WalkList walks={futureWalks} onDelete={deleteWalk} formPath="/form/" />
    </>
  );
};

export default upcoming;