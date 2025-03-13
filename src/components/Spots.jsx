import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Spots.module.css";
import Header from "./Header";

const spots = [
  "Mall Parking", "Park Parking", "Complex Parking", "Public Parking", "Theatre Parking",
  "Hotel Parking", "Restaurant Parking", "Hospital Parking", "Airport Parking", "Railway Station Parking",
  "Stadium Parking", "University Parking", "Museum Parking", "Convention Center Parking", "Shopping Center Parking",
  "Office Parking", "Bus Station Parking", "Residential Parking", "Government Building Parking", "Beach Parking"
];

const Spots = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const handleSelectSpot = (selectedSpot) => {
    localStorage.setItem("spot", selectedSpot);
    navigate("/time"); 
  };

  return (
    <>
    <Header/>
    <div className={styles.container}>
      <h2>Select a Parking Spot</h2>
      <div className={styles.grid}>
        {spots.slice(0, showMore ? spots.length : 10).map((spot, index) => (
          <div key={index} className={styles.card} onClick={() => handleSelectSpot(spot)}>
            {spot}
          </div>
        ))}
      </div>
      {!showMore && (
        <button onClick={() => setShowMore(true)} className={styles.moreBtn}>
          More...
        </button>
      )}
    </div>
    </>
  );
};

export default Spots;