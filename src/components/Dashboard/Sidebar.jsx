import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { BiLibrary, BiShareAlt, BiStar, BiSliderAlt } from "react-icons/bi";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [currPath, setCurrPath] = useState("");
  const location = useLocation();
  useEffect(() => {
    setCurrPath(location.pathname);
  }, [location]);

  return (
    <div className={styles.container}>
      <h2 className={styles.section}>Files</h2>
      <span className={styles.separator}></span>
      <Link
        className={`${styles.link} ${
          currPath === "/dashboard" ? styles.active : ""
        }`}
        to="."
      >
        <BiLibrary className={styles.icon} size="1.2rem" /> My libraries
      </Link>
      <Link
        className={`${styles.link} ${
          currPath === "/dashboard/shared" ? styles.active : ""
        }`}
        to="shared"
      >
        <BiShareAlt className={styles.icon} size="1.2rem" /> Shared with me
      </Link>

      <h2 className={styles.section}>Tools</h2>
      <span className={styles.separator}></span>
      <Link className={styles.link} to="favorites">
        <BiStar className={styles.icon} size="1.2rem" /> Favorites
      </Link>
      <Link
        className={`${styles.link} ${
          currPath === "/dashboard/settings" ? styles.active : ""
        }`}
        to="settings"
      >
        <BiSliderAlt className={styles.icon} size="1.2rem" /> Settings
      </Link>
    </div>
  );
};

export default Sidebar;
