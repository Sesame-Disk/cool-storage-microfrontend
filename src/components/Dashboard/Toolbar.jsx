import { useState } from "react";
import {
  BiRename,
  BiArchiveOut,
  BiCopyAlt,
  BiTrash,
  BiAddToQueue,
  BiShare,
  BiMessageAltAdd,
  BiCloudUpload,
  BiDownload,
} from "react-icons/bi";
import styles from "./Toolbar.module.css";
import HandleClickOut from "../Utils/HandleClickOut";
import Breadcrumbs from "./Breadcrumb";
import Dropdown from "../Utils/Dropdown";
import Modal from "../Utils/Modal";
import Share from "./Share";
import Copy from "./Copy";
import UploadFiles from "./UploadFiles/UploadFiles";
import FromSeafile from "./FromSeafile";

const Toolbar = () => {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isSeafileOpen, setIsSeafileOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);
  const [uploadSelectedFiles, setUploadSelectedFiles] = useState(null);
  const [crumbs, setCrumbs] = useState([
    { text: "Home", link: "/" },
    { text: "Library", link: "/library" },
    { text: "Sub Library", link: "/sub-library" },
  ]);

  return (
    <div className={styles.Toolbar}>
      <Breadcrumbs crumbs={crumbs} />
      <div className={styles.actions} data-testid="toolbar-actions">
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
        <button className={styles.action} onClick={() => setIsMoveOpen(true)}>
          <BiArchiveOut />
        </button>
        <button className={styles.action} onClick={() => setIsCopyOpen(true)}>
          <BiCopyAlt />
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
        <HandleClickOut
          onClickOutside={() => setIsUploadOpen(false)}
          style={{ display: "inline-block" }}
        >
          <button
            className={styles.action}
            onClick={() => setIsUploadOpen(!isUploadOpen)}
          >
            <BiCloudUpload />
          </button>
          <Dropdown isOpen={isUploadOpen} onClose={setIsUploadOpen}>
            <label className={styles.dropdown_item} htmlFor="upload[]">
              Upload Files
            </label>
            <input
              type="file"
              id="upload[]"
              name="upload[]"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                setUploadSelectedFiles(e);
                setIsUploadOpen(false);
                setIsUploadFileOpen(true);
                // e.target.value = null;
              }}
            />
            <button
              className={styles.dropdown_item}
              onClick={() => {
                setIsUploadOpen(false);
                setIsSeafileOpen(true);
              }}
            >
              Upload from Seafile
            </button>
          </Dropdown>
        </HandleClickOut>
        <button className={styles.action}>
          <BiDownload />
        </button>
      </div>

      {/*   RENAME FORM    */}
      {isRenameOpen && (
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
      )}

      {/*   DELETE FORM    */}
      {isDeleteOpen && (
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
      )}

      {/*   ADD FORM    */}
      {isAddOpen && (
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
      )}

      {/*   SHARE FORM    */}
      {isShareOpen && (
        <Modal
          isOpen={isShareOpen}
          className={styles.modal}
          onClose={() => setIsShareOpen(false)}
        >
          <Share onClose={setIsShareOpen} />
        </Modal>
      )}

      {/*   Copy FORM    */}
      {isCopyOpen && (
        <Modal
          isOpen={isCopyOpen}
          className={styles.modal}
          onClose={() => setIsCopyOpen(false)}
        >
          <Copy title="Copy selected item(s) to:" onClose={setIsCopyOpen} />
        </Modal>
      )}

      {/*   Move FORM    */}
      {isMoveOpen && (
        <Modal
          isOpen={isMoveOpen}
          className={styles.modal}
          onClose={() => setIsMoveOpen(false)}
        >
          <Copy title="Move selected item(s) to:" onClose={setIsMoveOpen} />
        </Modal>
      )}

      {/*   Upload Files FROM    */}
      {isUploadFileOpen && (
        <Modal
          isOpen={isUploadFileOpen}
          className={styles.modal}
          onClose={() => setIsUploadFileOpen(false)}
        >
          <UploadFiles
            title="Upload Files:"
            onClose={() => setIsUploadFileOpen(false)}
            files={uploadSelectedFiles}
          />
        </Modal>
      )}

      {/*   From Seafile FORM    */}
      {isSeafileOpen && (
        <Modal
          isOpen={isSeafileOpen}
          className={styles.modal}
          onClose={() => setIsSeafileOpen(false)}
        >
          <FromSeafile
            title="Upload from Seafile:"
            onClose={setIsSeafileOpen}
          />
        </Modal>
      )}
    </div>
  );
};

export default Toolbar;
