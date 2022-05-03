import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [currPath, setCurrPath] = useState("/");
  const location = useLocation();
  useEffect(() => {
    setCurrPath(location.pathname);
  }, [location]);

  return (
    <nav className={styles.navbar}>
      <Link className={styles["navbar-brand"]} to="/">
        <img
          src="logo.png"
          width="auto"
          height="50rem"
          className={styles["navbar-brand-img"]}
          alt="NiHao Cloud Logo"
        />
      </Link>
      <div className={styles["navbar-item-container"]}>
        <Link
          className={`${styles["navbar-item"]} ${
            currPath === "/home" && styles.active
          }`}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`${styles["navbar-item"]} ${
            currPath === "/home/about" && styles.active
          }`}
          to="/home/about"
        >
          About
        </Link>
      </div>
      <div className={styles["navbar-item-container"]}>
        <Link
          className={`${styles["navbar-item"]} ${styles.auth}`}
          to="/signup"
        >
          Signup
        </Link>
        <Link className={`${styles["navbar-item"]} ${styles.auth}`} to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
