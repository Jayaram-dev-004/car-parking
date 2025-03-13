import { HashRouter as Router, Routes, Route } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import Location from "./components/Location";
import Spots from "./components/Spots";
import Time from "./components/Time";
import Slots from "./components/Slots";
import Payment from "./components/Payment";
import QRCodePage from "./components/QRCodePage";
import "./App.css"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserInfo />} />
        <Route path="/location" element={<Location />} />
        <Route path="/spots" element={<Spots />} />
        <Route path="/time" element={<Time />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/qrcode" element={<QRCodePage />} />
      </Routes>
    </Router>
  );
}

export default App;