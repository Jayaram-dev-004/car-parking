import styles from "../styles/Header.module.css";
import logo from '../assets/logo.png'


const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>Car Parking System</h1>
    </header>
  );
};

export default Header;