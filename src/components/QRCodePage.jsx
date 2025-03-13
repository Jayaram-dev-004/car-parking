import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "../styles/QRCodePage.module.css";
import Header from "./Header";

const QRCodePage = () => {
  const navigate = useNavigate();
  const pdfRef = useRef();
  const [captcha, setCaptcha] = useState("");

  useEffect(() => {
    const captchaList = ["X1A9", "B7K2", "M8Q4", "P3L6", "Z5V1", "T9G7", "F4D3", "W2H8", "N6Y5", "J0R3", "C8X7", "L5T2", "Q9M4", "D3B1", "K7Z6"];
    const randomIndex = Math.floor(Math.random() * captchaList.length);
    setCaptcha(captchaList[randomIndex]);
  }, []);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const location = localStorage.getItem("location") || "Not Selected";
  const spot = localStorage.getItem("spot") || "Not Selected";
  const timeData = JSON.parse(localStorage.getItem("timeData")) || {};
  const slot = localStorage.getItem("slot") || "Not Selected";

  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => { 
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4"); 
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("BookingDetails.pdf");
      console.log("PDF Ref:", pdfRef.current);
    }).catch((err) => console.error("PDF Generation Error:", err));
  };
  const handleReturnHome = () => {
    alert("Thanks for booking!");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className={styles.qrContainer} ref={pdfRef}>
        <h2>Booking Details</h2>

        {userInfo.photo && (
          <img src={userInfo.photo} alt="User" style={{ width: "100px", height: "100px", borderRadius: "10%" }} />
        )}

        <div className={styles.details}>
          <p><strong>Name:</strong> {userInfo.name || "N/A"}</p>
          <p><strong>Email:</strong> {userInfo.email || "N/A"}</p>
          <p><strong>Phone:</strong> {userInfo.phone || "N/A"}</p>
          <p><strong>Number plate</strong> {userInfo.carNumber || "N/A"}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Spot:</strong> {spot}</p>
          <p><strong>Date:</strong> {timeData.date || "N/A"}</p>
          <p><strong>Time:</strong> {timeData.time || "N/A"}</p>
          <p><strong>Slot:</strong> {slot}</p>
        </div>
        

        <div className={styles.qrCode}>
          <h3>CAPTCHA Code:</h3>
          <div className={styles.captcha}>{captcha}</div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.downloadBtn} onClick={handleDownloadPDF}>
            Download PDF
          </button>
          <button className={styles.returnBtn} onClick={handleReturnHome}>
            Return to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default QRCodePage;