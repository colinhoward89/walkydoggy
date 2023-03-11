import * as WalkService from "../../services/WalkService";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const book = () => {
  const [dogName, setDogName] = useState("");
  const [date, setDate] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const ownerID = localStorage.getItem("userId");
  console.log("book a walk: " + ownerID);

  const postWalk = async (walk) => {
    const output = await WalkService.postWalk(walk);
    if (!output.error) {
      const successToast = () => toast("Your walky has been booked!");
      successToast();
      console.log(output.res);
      //need error handling
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postWalk({ ownerID, dogName, date, pickUpLocation });
    setDogName("");
    setDate("");
    setPickUpLocation("");
  };

  return (
    <>
      <div className="myaccount-div">
        <Link href="/owneraccount/book">
          <button className={styles.buttonselected}>Book a walk</button>
        </Link>
        <Link href="/owneraccount/ownerhistory">
          <button className={styles.button}>View My Walk History</button>
        </Link>
        <Link href="/owneraccount/upcoming">
          <button className={styles.button}>Upcoming Walks</button>
        </Link>
      </div>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>DOG NAME</label>
          <input
            type="text"
            name="title"
            placeholder="your dog's name"
            required
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>DATE</label>
          <DatePicker
            className="date-picker"
            showTimeSelect
            required
            selected={date}
            onSelect={(date) => setDate(date)} //when day is clicked
            onChange={(date) => setDate(date)} //only when value has changed
            dateFormat="Pp"
          />
        </div>
        <div className="form-control">
          <label>PICK-UP LOCATION</label>
          <input
            type="text"
            name="venue"
            placeholder="pick up address"
            required
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
          />
        </div>
        <input type="submit" value="BOOK" className="btn-block" />
      </form>
      <ToastContainer />
    </>
  );
};

export default book;
