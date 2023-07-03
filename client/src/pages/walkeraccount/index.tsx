import Link from "next/link";
import styles from "../../styles/Home.module.css";

const WalkerAccount = () => {
  return (
    <div>
      <h1 className={styles.title}>Walker</h1>
      <div className="myaccount">
        <Link href={{ pathname: "/walkeraccount/find" }}>
          <button className={styles.button} aria-label="Find a Walk">
            Find a Walk
          </button>
        </Link>
        <Link href={{ pathname: "/walkeraccount/scheduled" }}>
          <button className={styles.button} aria-label="Scheduled Walks">
            Scheduled Walks
          </button>
        </Link>
        <Link href={{ pathname: "/walkeraccount/walkerhistory" }}>
          <button className={styles.button} aria-label="View My Walk History">
            View My Walk History
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WalkerAccount;
