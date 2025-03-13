import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Location.module.css";
import Header from "./Header";

const locations = [
  "Delhi", "Chennai", "Bangalore", "Mumbai", "Kolkata",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Surat", "Indore", "Bhopal", "Chandigarh", "Patna",
  "Nagpur", "Visakhapatnam", "Ludhiana", "Agra", "Varanasi"
];

const Location = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const handleSelectLocation = (selectedLocation) => {
    localStorage.setItem("location", selectedLocation);
    navigate("/spots"); 
  };

  return (
    <>
    <Header/>
    <div className={styles.container}>
      <h2>Select Your Location</h2>
      <div className={styles.grid}>
        {locations.slice(0, showMore ? locations.length : 10).map((city, index) => (
          <div key={index} className={styles.card} onClick={() => handleSelectLocation(city)}>
            {city}
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

export default Location;