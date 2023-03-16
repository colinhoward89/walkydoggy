import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import * as WalkService from "../../services/WalkService";
import Link from "next/link";

type Walk = {
  _id?: string;
  ownerID: string;
  dogName: string;
  date: Date;
  pickUpLocation: string;
  walkerID?: string;
  imageURL?: string[];
  coordinates?: number[];
  didPee?: boolean;
  didPoo?: boolean;
};

const formuser = (): JSX.Element => {
  const router = useRouter();
  const { _id } = router.query;
  const [walkRecord, setWalkRecord] = useState<Walk>();

  useEffect(() => {
    WalkService.getWalk(_id as string).then((walk: Walk) =>
      setWalkRecord(walk)
    );
  }, []);

  return (
    <>
          <div className="myaccount">
        <Link href="/owneraccount/book">
          <button className={styles.button}>Book a walk</button>
        </Link>
        <Link href="/owneraccount/upcoming">
          <button className={styles.button}>Upcoming Walks</button>
        </Link>
        <Link href="/owneraccount/ownerhistory">
          <button className={styles.button}>View My Walk History</button>
        </Link>
      </div>
      <h2 className={styles.title}> Walk Record </h2>
      <div className="record-div-outer">
        {walkRecord !== undefined ? (
          <div className="record-div">
              <label>POO : {walkRecord.didPoo ? "Yes" : "No"} </label>
              <p></p>
              <label>PEE : {walkRecord.didPee ? "Yes" : "No"} </label>
              <p></p>
            {walkRecord.imageURL
              ? walkRecord.imageURL.map((img) => <img src={img} key={img} />)
              : null}
          </div>
        ) : (
          "We unfortunately don't have any pee or poo data yet!"
        )}
      </div>
    </>
  );
};

export default formuser;
