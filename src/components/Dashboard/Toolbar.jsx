import { useState } from "react";
import {
  BiRename,
  BiTrash,
  BiAddToQueue,
  BiCloudUpload,
  BiCloudDownload,
} from "react-icons/bi";
import styles from "./Toolbar.module.css";
import Breadcrumbs from "./Breadcrumb";
import Modal from "../Modal";

const Toolbar = () => {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [crumbs, setCrumbs] = useState([
    { text: "Home", link: "/" },
    { text: "Library", link: "/library" },
    { text: "Sub Library", link: "/sub-library" },
  ]);

  return (
    <div className={styles.Toolbar}>
      <Breadcrumbs crumbs={crumbs} />
      <div className={styles.actions}>
        <button className={styles.action} onClick={() => setIsRenameOpen(true)}>
          <BiRename />
        </button>
        <button className={styles.action}>
          <BiTrash />
        </button>
        <button className={styles.action}>
          <BiAddToQueue />
        </button>
        <button className={styles.action}>
          <BiCloudUpload />
        </button>
        <button className={styles.action}>
          <BiCloudDownload />
        </button>
      </div>

      <Modal isOpen={isRenameOpen} className={styles.modal}>
        <h3 className={styles.title}>Rename</h3>
        <input
          type="text"
          placeholder="Rename text here"
          className={`${styles.field} ${styles.field_text}`}
        />
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.btn_action}`}>
            Rename
          </button>
          <button
            className={`${styles.btn} ${styles.btn_cancel}`}
            onClick={() => setIsRenameOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Toolbar;
