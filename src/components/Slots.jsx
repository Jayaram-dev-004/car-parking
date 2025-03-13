import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Slots.module.css";
import Header from "./Header";

const totalSlots = 25; 
const availableSlots = Array.from({ length: totalSlots }, (_, i) => ({
  id: i + 1,
  booked: Math.random() < 0.3, 
}));

const Slots = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState(availableSlots);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (id) => {
    if (slots.find((slot) => slot.id === id && slot.booked)) return;
    setSelectedSlot(id);
    localStorage.setItem("slot", id);
  };

  const handleNext = () => {
    if (!selectedSlot) {
      alert("Please select a parking slot!");
      return;
    }
    navigate("/payment");
  };

  return (
    <>
    <Header/>
    <div className={styles.container}>
      <h2>Select Your Parking Slot</h2>
      <div className={styles.grid}>
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`${styles.slot} ${
              slot.booked ? styles.booked : selectedSlot === slot.id ? styles.selected : styles.available
            }`}
            onClick={() => handleSlotClick(slot.id)}
          >
            {slot.id}
          </div>
        ))}
      </div>
      <button className={styles.nextBtn} onClick={handleNext}>Next</button>
    </div>
    </>
  );
};

export default Slots;