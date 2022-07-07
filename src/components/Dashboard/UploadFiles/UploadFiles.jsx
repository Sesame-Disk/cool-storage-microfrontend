import React, { useState, useEffect } from "react";
import styles from "./UploadFiles.module.css";
import ProgressBar from "../../Utils/ProgressBar";
import {
  BiFolder,
  BiCloudUpload,
  BiTrash,
  BiPlay,
  BiPause,
} from "react-icons/bi";
import HugeUploader from "huge-uploader";

const UploadFiles = (props) => {
  const [uploader, setUploader] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUploader, setIsUploader] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPause, setIsPause] = useState();
  const [filePercent, setFilePercent] = useState([0]);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [uploadSize, setUploadSize] = useState(0);

  useEffect(() => {
    if (props.files != null) {
      AddFile(props.files);
      setIsUploading(true);
    }
  }, []);

  useEffect(() => {
    if (isUploading && currentIndex < selectedFiles.length) {
      SendFileUpload(selectedFiles[currentIndex], currentIndex);
    }
  }, [isUploading, currentIndex]);

  useEffect(() => {
    setUploadPercent((uploadSize / totalSize) * 100);
  }, [uploadSize, totalSize]);

  const SendFileUpload = (ufile, index) => {
    // let auxIsPause = [...isPause];
    // auxIsPause[index] = true;
    // setIsPause(auxIsPause);
    if (!isPause[index]) {
      let auxUploader = new HugeUploader({
        endpoint: "http://localhost:3001/api/v1/single/upload",
        chunkSize: 5,
        file: ufile,
      });
      setUploader(auxUploader);

      auxUploader.on("error", (err) => {
        console.error("Something bad happened", err.detail);
      });

      auxUploader.on("progress", (progress) => {
        let auxSize = ufile.size * (progress.detail / 100);
        setUploadSize(uploadSize + auxSize);
        filePercent[index] = progress.detail;
        console.log(progress.detail, "%");
        setFilePercent(filePercent);
      });

      auxUploader.on("finish", (body) => {
        if (index === selectedFiles.length - 1) {
          setIsUploader(true);
        }
        setCurrentIndex(index + 1);
        setUploader();
      });
    } else {
      setCurrentIndex(index + 1);
    }
  };

  const TogglePause = (index) => {
    let auxIsPause = [...isPause];
    if (index === currentIndex) {
      uploader.togglePause();
      setIsPause(auxIsPause);
      auxIsPause[index] = !auxIsPause[index];
    } else {
      auxIsPause[index] = !auxIsPause[index];
    }
  };

  const AddFile = (e) => {
    let newFiles = e.target.files;
    let aux = [...newFiles];
    setSelectedFiles(aux);
    ChangeTotalSize(aux);
    setIsPause(Array(aux.length).fill(false));
    setFilePercent(Array(aux.length).fill(0));
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

  const ChangeTotalSize = (files) => {
    let total = 0;
    files.forEach((file) => {
      total += file.size;
    });
    setTotalSize(total);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h4>{props.title}</h4>
      </div>
      <main className={styles.modalBody}>
        {/* {!isUploading ? (
          <form
            id="form"
            className={styles.modalForm}
            onSubmit={(e) => HandleSubmit(e)}
          >
            <div className={styles.btn_container}>
              <label
                htmlFor="upload[]"
                className={`${styles.btn_secondary} ${
                  isUploading && styles.disabled
                }`}
              >
                <BiFolder className={styles.btn_icon} />
                <span className={styles.btn_text}>Select</span>
              </label>
              <input
                type="file"
                id="upload[]"
                name="upload[]"
                multiple
                disabled={isUploading}
                style={{ display: "none" }}
                onChange={(e) => AddFile(e)}
              />
              <button
                type="submit"
                className={`${styles.btn_primary}
                ${selectedFiles.length === 0 && styles.disabled}
                `}
                disabled={selectedFiles.length === 0 ? true : false}
              >
                <BiCloudUpload className={styles.btn_icon} />
                Upload
              </button>
            </div>
          </form>
        ) : ( */}
        <ProgressBar upload width={uploadPercent} text="Uploading..." />
        {/* )} */}
        <div className={styles.status_info}>
          <span>{`${uploadPercent.toFixed(0)} %`}</span>|
          <span>{`${DinamicSize(uploadSize)}/${DinamicSize(totalSize)}`}</span>
        </div>
        {!isUploader && (
          <div style={{ float: "right" }}>
            <span
              className={styles.btn_terciary}
              onClick={() => console.log("cancel")}
            >
              cancel all
            </span>
            <span
              className={styles.btn_terciary}
              onClick={() => console.log("restore all")}
            >
              restore all
            </span>
          </div>
        )}
        <div className={styles.modal_preview}>
          {selectedFiles.map((file, index) => {
            {
              /* //todo: Make item a component  */
            }
            let src = "/images/file_preview.png";
            let cover = "";
            if (file.type.includes("image")) {
              src = URL.createObjectURL(file);
              cover = styles.img__cover;
            }

            return (
              <div className={styles.modal_preview_item} key={index}>
                <img
                  src={src}
                  alt="preview"
                  className={`${styles.modal_preview_item_img} ${cover}`}
                />
                <div className={styles.modal_preview_item_info}>
                  <p className={styles.modal_preview_item_info_name}>
                    <span>{WrapName(file.name)}</span>
                  </p>
                  <p className={styles.modal_preview_item_info_size}>
                    <span>{DinamicSize(file.size)}</span>
                  </p>
                </div>
                <span className={styles.percent}>{filePercent[index]}%</span>
                <div className={styles.modal_preview_item_actions}>
                  {/* //todo: togglePause func */}
                  {filePercent[index] !== 100 &&
                    (isPause[index] ? (
                      <span className={styles.btn_terciary}>restore</span>
                    ) : (
                      <span className={styles.btn_terciary}>cancel</span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
        {isUploader && (
          <button
            className={`${styles.btn_primary} ${styles.btn_buttom}`}
            onClick={() => props.onClose()}
          >
            Close
          </button>
        )}
      </main>
    </div>
  );
};

export default UploadFiles;
