import { useState } from "react";
import {
  BiRename,
  BiTrash,
  BiAddToQueue,
  BiShare,
  BiMessageAltAdd,
  BiCloudUpload,
  BiCloudDownload,
} from "react-icons/bi";
import styles from "./Toolbar.module.css";
import HandleClickOut from "../Utils/HandleClickOut";
import Breadcrumbs from "./Breadcrumb";
import Dropdown from "../Utils/Dropdown";
import Modal from "../Utils/Modal";

const Toolbar = () => {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [crumbs, setCrumbs] = useState([
    { text: "Home", link: "/" },
    { text: "Library", link: "/library" },
    { text: "Sub Library", link: "/sub-library" },
  ]);

  return (
    <div className={styles.Toolbar}>
      <Breadcrumbs crumbs={crumbs} />
      <div className={styles.actions}>
        <HandleClickOut
          onClickOutside={() => setIsNewOpen(false)}
          style={{ display: "inline-block" }}
        >
          <button
            className={styles.action}
            onClick={() => setIsNewOpen(!isNewOpen)}
          >
            <BiMessageAltAdd />
          </button>
          <Dropdown isOpen={isNewOpen} onClose={setIsNewOpen} center>
            <button className={styles.dropdown_item}>New Folder</button>
            <button className={styles.dropdown_item}>New File</button>
            <button className={styles.dropdown_item}>New Markdown</button>
            <button className={styles.dropdown_item}>New Excel File</button>
            <button className={styles.dropdown_item}>
              New PowerPoint File
            </button>
            <button className={styles.dropdown_item}>New World File</button>
          </Dropdown>
        </HandleClickOut>
        <button className={styles.action} onClick={() => setIsRenameOpen(true)}>
          <BiRename />
        </button>
        <button className={styles.action} onClick={() => setIsDeleteOpen(true)}>
          <BiTrash />
        </button>
        <button className={styles.action} onClick={() => setIsAddOpen(true)}>
          <BiAddToQueue />
        </button>
        <button className={styles.action} onClick={() => setIsShareOpen(true)}>
          <BiShare />
        </button>
        <button className={styles.action}>
          <BiCloudUpload />
        </button>
        <button className={styles.action}>
          <BiCloudDownload />
        </button>
      </div>

      {/*   RENAME FORM    */}
      <Modal isOpen={isRenameOpen} className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Rename</h3>
        </div>
        <div className={styles.modalBody}>
          <input
            type="text"
            placeholder="Rename text here"
            className={`${styles.field} ${styles.field_text}`}
          />
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.modalAction} ${styles.btn_action}`}>
            Rename
          </button>
          <button
            className={`${styles.modalAction} ${styles.btn_cancel}`}
            onClick={() => setIsRenameOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/*   DELETE FORM    */}
      <Modal isOpen={isDeleteOpen} className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Delete</h2>
        </div>
        <div className={styles.modalBody}>
          <p>Are you sure you want to delete this file?</p>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={`${styles.modalAction} ${styles.btn_cancel}`}
            onClick={() => setIsDeleteOpen(false)}
          >
            Cancel
          </button>
          <button className={`${styles.modalAction} ${styles.btn_action}`}>
            Delete
          </button>
        </div>
      </Modal>

      {/*   ADD FORM    */}
      <Modal isOpen={isAddOpen} className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>New Library</h2>
        </div>
        <div className={styles.modalBody}>
          <input
            type="text"
            className={`${styles.field} ${styles.field_text}`}
            placeholder="Name"
          />
        </div>
        <div className={styles.modalFooter}>
          <button
            className={`${styles.modalAction} ${styles.btn_cancel}`}
            onClick={() => setIsAddOpen(false)}
          >
            Cancel
          </button>
          <button className={`${styles.modalAction} ${styles.btn_action}`}>
            Create
          </button>
        </div>
      </Modal>

      {/*   SHARE FORM    */}
      <Modal
        isOpen={isShareOpen}
        className={styles.modal}
        onClose={() => setIsShareOpen(false)}
      >
        <div className={styles.modalHeader}>
          <h3>Share</h3>
        </div>
        <div className={styles.modalBody}>
          <p>Share this file with others</p>
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.modalAction} ${styles.btn_action}`}>
            Share
          </button>
          <button
            className={`${styles.modalAction} ${styles.btn_cancel}`}
            onClick={() => setIsShareOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Toolbar;
