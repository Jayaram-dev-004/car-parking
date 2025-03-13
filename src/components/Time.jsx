import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Time.module.css";
import Header from "./Header";

const Time = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleNext = () => {
    if (!date || !time) {
      alert("Please select a date and time!");
      return;
    }

   
    const timeData = { date, time };
    localStorage.setItem("timeData", JSON.stringify(timeData));

    navigate("/slots"); 
  };

  return (
    <>
    <Header/>
    <div className={styles.container}>
      <h2>Select Date & Time</h2>
      <div className={styles.inputContainer}>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className={styles.inputContainer}>
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <button className={styles.nextBtn} onClick={handleNext}>Next</button>
    </div>
    </>
  );
};

export default Time;