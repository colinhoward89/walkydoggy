import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

const OwnerAccount = () => {
  return (
    <>
      <Head>
        <title>Walky Doggy | Owner</title>
      </Head>
      <div>
        <div>
          <h1 className={styles.title}>Owner</h1>
          <div className="myaccount-div">
            <Link href="/account/book">
              <button className={styles.button}>Book a walk</button>
            </Link>
            <Link href="/account/ownerhistory">
              <button className={styles.button}>View My Walk History</button>
            </Link>
            <Link href="/account/upcoming">
              <button className={styles.button}>Upcoming Walks</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerAccount;