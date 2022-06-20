import React, { useState } from "react";
import axios from "axios";
import styles from "./UploadFiles.module.css";
import ProgressBar from "../../Utils/ProgressBar/ProgressBar";
import { BiFolder } from "react-icons/bi";

const UploadFiles = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadPercent, setUploadPercent] = useState(0);

  const HandleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(document.querySelector("#form"));
    axios
      .post("http://localhost:3001/api/v1/multiple/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress(progressEvent) {
          let percentCompleted =
            (progressEvent.loaded * 100) / progressEvent.total;
          setUploadPercent(percentCompleted);
          console.log(percentCompleted);
        },
      })
      .then((res) => {
        setTimeout(() => {
          setUploadPercent(0);
          setSelectedFiles([]);
          //todo: reset form
        }, 2000);
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h4>{props.title}</h4>
      </div>
      <main className={styles.modalBody}>
        <form
          id="form"
          className={styles.modalForm}
          onSubmit={(e) => HandleSubmit(e)}
        >
          <div className={styles.btn_container}>
            <span className={styles.btn_text}>
              {selectedFiles.length} file(s) selected
            </span>
            <label htmlFor="upload[]" className={styles.btn_label}>
              <BiFolder className={styles.btn_icon} />
            </label>
            <input
              type="file"
              id="upload[]"
              name="upload[]"
              multiple
              style={{ display: "none" }}
              onChange={(e) => setSelectedFiles([...e.target.files])}
            />
          </div>
          {uploadPercent > 0 && <ProgressBar value={uploadPercent} />}
          <button type="submit" className={styles.btn_action}>
            {/* //todo: make Loading, disable btn */}
            Upload
          </button>
        </form>
        <div className={styles.modal_preview}>
          {selectedFiles.map((file, index) => (
            <div className={styles.modal_preview_item} key={index}>
              <div className={styles.modal_preview_item_img}>
                <img
                  src={
                    URL.createObjectURL(file)
                      ? URL.createObjectURL(file)
                      : "https://via.placeholder.com/150"
                    // todo: correct second loading preview item
                  }
                  alt="preview"
                  className={styles.modal_preview_item_img_img}
                />
              </div>
              <div className={styles.modal_preview_item_info}>
                <p className={styles.modal_preview_item_info_name}>
                  <span>{file.name}</span>
                </p>
                <p className={styles.modal_preview_item_info_size}>
                  {/* //todo: dinamic change to kb-mb-gb... */}
                  <span>{(file.size / 1024).toFixed(2)} kb</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UploadFiles;
