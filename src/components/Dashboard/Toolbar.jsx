import { useState } from "react";
import {
  BiTrash,
  BiAddToQueue,
  BiCloudUpload,
  BiCloudDownload,
} from "react-icons/bi";
import styles from "./Toolbar.module.css";
import Breadcrumbs from "./Breadcrumb";

const Toolbar = () => {
  const [crumbs, setCrumbs] = useState([
    { text: "Home", link: "/" },
    { text: "Library", link: "/library" },
    { text: "Sub Library", link: "/sub-library" },
  ]);

  return (
    <div className={styles.Toolbar}>
      <Breadcrumbs crumbs={crumbs} />
      <div className={styles.actions}>
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
    </div>
  );
};

export default Toolbar;
