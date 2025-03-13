import { useNavigate } from "react-router-dom";
import styles from "../styles/Payment.module.css";
import Header from "./Header";

const Payment = () => {
  const navigate = useNavigate();
  const amount = 50; 

  const handlePayment = () => {
    alert("Payment Successful!");
    navigate("/qrcode");
  };

  return (
    <>
    <Header/>
    <div className={styles.container}>
      <h2>Payment</h2>
      <p className={styles.amount}>₹{amount}</p>
      <button className={styles.payBtn} onClick={handlePayment}>Pay</button>
    </div>
    </>
  );
};

export default Payment;