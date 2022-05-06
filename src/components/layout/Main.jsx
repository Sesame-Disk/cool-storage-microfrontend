import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className="main">
      <Navbar />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
