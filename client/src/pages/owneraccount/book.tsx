import * as WalkService from "../../services/WalkService";
import { SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const book = (): JSX.Element => {
  const [dogName, setDogName] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [pickUpLocation, setPickUpLocation] = useState<string>("");
  const ownerID = localStorage.getItem("userId");

  const postWalk = async (walk: Walk) => {
    const output = await WalkService.postWalk(walk);
    if (!output.error) {
      const successToast = () => toast("Your walky has been booked!");
      successToast();
    } else {
      const errorToast = () => toast(output.res);
      errorToast();
    }
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    postWalk({ ownerID, dogName, date, pickUpLocation });
    setDogName("");
    setDate(null);
    setPickUpLocation("");
  };

  return (
    <>
      <section className="myaccount">
        <Link href="/owneraccount/book">
          <button className={styles.buttonselected} aria-label="Book a walk">Book a walk</button>
        </Link>
        <Link href="/owneraccount/upcoming">
          <button className={styles.button} aria-label="Upcoming Walks">Upcoming Walks</button>
        </Link>
        <Link href="/owneraccount/ownerhistory">
          <button className={styles.button} aria-label="View My Walk History">View My Walk History</button>
        </Link>
      </section>

      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="dogName">DOG NAME</label>
          <input
            type="text"
            id="dogName"
            name="dogName"
            placeholder="Your dog's name"
            required
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="date">DATE</label>
          <DatePicker
            className="date-picker"
            id="date"
            showTimeSelect
            required
            selected={date}
            onSelect={(date) => setDate(date)} // When day is clicked
            onChange={(date) => setDate(date)} // Only when value has changed
            dateFormat="Pp"
          />
        </div>
        <div className="form-control">
          <label htmlFor="pickUpLocation">PICK-UP LOCATION</label>
          <input
            type="text"
            id="pickUpLocation"
            name="pickUpLocation"
            placeholder="Pick up address"
            autoComplete="off"
            required
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
          />
        </div>
        <input type="submit" value="BOOK" className="btn-block" />
      </form>
    </>
  );
};

export default book;
