import { useState } from "react";
import { BiLibrary, BiShareAlt, BiStar, BiSliderAlt } from "react-icons/bi";
import styles from "./Sidebar.module.css";
import Modal from "../Modal";

const Sidebar = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.section}>Files</h2>
      <span className={styles.separator}></span>
      <a className={`${styles.link} ${styles.active}`} href="/">
        <BiLibrary className={styles.icon} size="1.2rem" /> My libraries
      </a>
      <button className={styles.link} onClick={() => setIsShareOpen(true)}>
        <BiShareAlt className={styles.icon} size="1.2rem" /> Shared with me
      </button>

      <h2 className={styles.section}>Tools</h2>
      <span className={styles.separator}></span>
      <a className={styles.link} href="/">
        <BiStar className={styles.icon} size="1.2rem" /> Favorites
      </a>
      <a className={styles.link} href="/">
        <BiSliderAlt className={styles.icon} size="1.2rem" /> Settings
      </a>

      <Modal
        isOpen={isShareOpen}
        closeBtn
        width="800px"
        onClose={() => setIsShareOpen(false)}
      >
        <h2>Modal</h2>
      </Modal>
    </div>
  );
};

export default Sidebar;
