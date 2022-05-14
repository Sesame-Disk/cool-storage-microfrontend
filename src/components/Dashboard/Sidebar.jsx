import { BiLibrary, BiShareAlt, BiStar, BiSliderAlt } from "react-icons/bi";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.section}>Files</h2>
      <span className={styles.separator}></span>
      <a className={`${styles.link} ${styles.active}`} href="/">
        <BiLibrary className={styles.icon} size="1.2rem" /> My libraries
      </a>
      <a className={styles.link} href="/">
        <BiShareAlt className={styles.icon} size="1.2rem" /> Shared with me
      </a>

      <h2 className={styles.section}>Tools</h2>
      <span className={styles.separator}></span>
      <a className={styles.link} href="/">
        <BiStar className={styles.icon} size="1.2rem" /> Favorites
      </a>
      <a className={styles.link} href="/">
        <BiSliderAlt className={styles.icon} size="1.2rem" /> Settings
      </a>
    </div>
  );
};

export default Sidebar;
