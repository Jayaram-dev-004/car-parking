import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/UserInfo.module.css";
import Header from "./Header";

const UserInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    carNumber: "",
    phone: "",
    photo: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCarNumberChange = (e) => {
    const value = e.target.value.toUpperCase();
    setUser((prev) => ({ ...prev, carNumber: value }));
  };

  const validateNumberPlate = () => {
    const pattern = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/; 
    if (!pattern.test(user.carNumber)) {
      setError("Invalid Number Plate! Use format: KA 01 AB 1234");
      return false;
    } 
    setError("Valid Number Plate!");
    return true;
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!validateNumberPlate()) {
      alert("Invalid Number Plate! Please correct it before proceeding.");
      return;
    }

    if (!user.name || !user.email || !user.phone || !user.carNumber) {
      alert("Please fill in all required fields!");
      return;
    }

    localStorage.setItem("userInfo", JSON.stringify(user));
    console.log(localStorage)
    navigate("/location");
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>User Credentials</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="carNumber"
          value={user.carNumber}
          onChange={handleCarNumberChange}
          placeholder="KA 01 AB 1234"
          maxLength="13"
          style={{
            fontSize: "18px",
            padding: "10px",
            border: "2px solid black",
            borderRadius: "5px",
            textTransform: "uppercase",
          }}
        />
        <p style={{ color: error.includes("Invalid") ? "red" : "green", fontSize: "16px" }}>
          {error}
        </p>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={user.phone}
          onChange={handleChange}
        />
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />

        {user.photo && <img src={user.photo} alt="Preview" className={styles.imagePreview} />}

        <button onClick={handleSubmit}>Next</button>
      </div>
    </>
  );
};

export default UserInfo;