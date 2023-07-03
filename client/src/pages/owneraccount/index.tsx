import Link from "next/link";
import styles from "../../styles/Home.module.css";

const OwnerAccount = () => {
  return (
    <header>
      <h1 className={styles.title}>Owner</h1>
      <div className="myaccount">
        <Link href="/owneraccount/book">
          <button className={styles.button} aria-label="Book a walk">Book a walk</button>
        </Link>
        <Link href="/owneraccount/upcoming">
          <button className={styles.button} aria-label="Upcoming Walks">Upcoming Walks</button>
        </Link>
        <Link href="/owneraccount/ownerhistory">
          <button className={styles.button} aria-label="View My Walk History">View My Walk History</button>
        </Link>
      </div>
    </header>
  )
};

export default OwnerAccount;
