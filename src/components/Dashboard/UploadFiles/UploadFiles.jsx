import React, { useState, useEffect } from "react";
import styles from "./UploadFiles.module.css";
import ProgressBar from "../../Utils/ProgressBar";
import UploadItem from "./UploadItem/UploadItem";

const UploadFiles = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUploader, setIsUploader] = useState(false);
  const [isPause, setIsPause] = useState();
  const [uploadPercent, setUploadPercent] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [uploadSize, setUploadSize] = useState(0);

  useEffect(() => {
    if (props.files != null) {
      AddFile(props.files);
    }
  }, []);

  useEffect(() => {
    setUploadPercent((uploadSize / totalSize) * 100);
  }, [uploadSize, totalSize]);

  const AddFile = (e) => {
    let newFiles = e.target.files;
    let aux = [...newFiles];
    setSelectedFiles(aux);
    ChangeTotalSize(aux);
    setIsPause(Array(aux.length).fill(false));
  };

  const ChangeTotalSize = (files) => {
    let total = 0;
    files.forEach((file) => {
      total += file.size;
    });
    setTotalSize(total);
  };

  const DinamicSize = (size) => {
    let typeIndex = Math.floor(Math.log(size) / Math.log(1024));
    let typeArray = ["B", "KB", "MB", "GB", "TB", "PB"];
    let newSize = (size / Math.pow(1024, typeIndex)).toFixed(2);
    return `${newSize} ${typeArray[typeIndex]}`;
  };

  const increaseIndex = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === selectedFiles.length - 1) {
      if (!isPause.includes(true)) {
        setIsUploader(true);
      } else {
        setCurrentIndex(isPause.indexOf(true));
      }
    }
  };

  const CancelAll = () => {};
  const RestoreAll = () => {};

  return (
    <div className={styles.modal} data-testid="upload-modal">
      <div className={styles.modalHeader}>
        <h4>{props.title}</h4>
      </div>
      <main className={styles.modalBody}>
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
            return (
              <UploadItem
                file={file}
                key={index}
                index={index}
                currentIndex={currentIndex}
                increaseIndex={increaseIndex}
                isPause={isPause}
                setIsPause={setIsPause}
                setUploadSize={(size) => setUploadSize(uploadSize + size)}
              />
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
