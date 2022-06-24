import React, { useState } from "react";
import axios from "axios";
import styles from "./UploadFiles.module.css";
import ProgressBar from "../../Utils/ProgressBar/ProgressBar";
import { BiFolder, BiCloudUpload, BiX } from "react-icons/bi";

const UploadFiles = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadPercent, setUploadPercent] = useState(0);

  const HandleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(selectedFiles);
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
          e.target.value = null;
        }, 2000);
      });
  };

  const AddFile = (e) => {
    let newFiles = e.target.files;
    let aux = [...selectedFiles, ...newFiles];
    setSelectedFiles(aux);
    e.target.value = null;
  };

  const RemoveFile = (file) => {
    let remove = [...selectedFiles];
    remove.splice(file, 1);
    setSelectedFiles(remove);
  };

  const WrapName = (name) => {
    if (name.length > 25) {
      let extension = name.split(".").pop();
      let newName = `${name.slice(0, 25)}...${extension}`;
      name = newName;
    }
    return name;
  };

  const DinamicSize = (size) => {
    let typeIndex = Math.floor(Math.log(size) / Math.log(1024));
    let typeArray = ["B", "KB", "MB", "GB", "TB", "PB"];
    let newSize = (size / Math.pow(1024, typeIndex)).toFixed(2);
    return `${newSize} ${typeArray[typeIndex]}`;
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
            <label htmlFor="upload[]" className={styles.btn_secondary}>
              <BiFolder className={styles.btn_icon} />
              <span className={styles.btn_text}>Select</span>
            </label>
            <input
              type="file"
              id="upload[]"
              name="upload[]"
              multiple
              style={{ display: "none" }}
              onChange={(e) => AddFile(e)}
            />
            <button
              type="submit"
              className={
                selectedFiles.length === 0
                  ? styles.btn_disabled
                  : styles.btn_primary
              }
              disabled={selectedFiles.length === 0 ? true : false}
            >
              {/* //todo: make Loading*/}
              <BiCloudUpload className={styles.btn_icon} />
              Upload
            </button>
          </div>
          {uploadPercent > 0 && <ProgressBar value={uploadPercent} />}
        </form>
        <div className={styles.modal_preview}>
          {selectedFiles.map((file, index) => (
            <div className={styles.modal_preview_item} key={index}>
              <BiX
                className={styles.modal_preview_item_close}
                onClick={() => RemoveFile(index)}
              />
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
                  <span>{WrapName(file.name)}</span>
                </p>
                <p className={styles.modal_preview_item_info_size}>
                  <span>{DinamicSize(file.size)}</span>
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
