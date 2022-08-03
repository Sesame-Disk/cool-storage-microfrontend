import React, { useState, useEffect, useCallback } from "react";
import styles from "./UploadFiles.module.css";
import ProgressBar from "../../Utils/ProgressBar";
import UploadItem from "./UploadItem/UploadItem";

const UploadFiles = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finishList, setFinishedList] = useState([]);
  const [uploadList, setUploadList] = useState([]);
  const [pauseList, setPauseList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploader, setIsUploader] = useState(false);
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
  useEffect(() => {
    console.log("uploadList", uploadList);
    if (uploadList.length === 0) {
      setIsUploader(true);
    }
    setCurrentIndex(uploadList[0]);
  }, [uploadList]);

  const AddFile = (e) => {
    let newFiles = e.target.files;
    let aux = [...newFiles];
    setSelectedFiles(aux);
    setUploadList(Array.from(aux.keys()));
    ChangeTotalSize(aux);
  };
  const ChangeTotalSize = (files) => {
    let total = 0;
    files.forEach((file) => {
      total += file.size;
    });
    setTotalSize(total);
  };
  const DinamicSize = (size) => {
    if (size === 0) {
      return "0 B";
    }
    let typeIndex = Math.floor(Math.log(size) / Math.log(1024));
    let typeArray = ["B", "KB", "MB", "GB", "TB", "PB"];
    let newSize = (size / Math.pow(1024, typeIndex)).toFixed(2);
    return `${newSize} ${typeArray[typeIndex]}`;
  };

  const FinishUploadFile = useCallback(() => {
    setFinishedList([...finishList, uploadList[0]]);
    let newUpload = [...uploadList];
    newUpload.shift();
    console.log("pauseList", pauseList);
    let inter = newUpload.filter((e) => {
      return pauseList.indexOf(e) === -1;
    });
    setUploadList(inter);
    setIsUploading(false);
  }, [finishList, pauseList, uploadList]);
  const Cancel = (index) => {
    let aux = [...uploadList];
    let auxIndex = uploadList.indexOf(index);
    aux.splice(auxIndex, 1);
    setUploadList([...aux]);
    console.log(aux);
    console.log(uploadList);
    let auxPause = [...pauseList];
    auxPause.push(index);
    setPauseList(auxPause);
  };
  const Restore = (index) => {
    let aux = [...pauseList];
    let auxIndex = pauseList.indexOf(index);
    aux.splice(auxIndex, 1);
    setPauseList(aux);
    let auxUpload = [...uploadList];
    auxUpload.push(index);
    setUploadList(auxUpload);
  };

  const CancelAll = () => {
    setPauseList([...pauseList, ...uploadList]);
    setUploadList([]);
  };
  const RestoreAll = () => {
    setUploadList([...uploadList, ...pauseList]);
    setPauseList([]);
  };

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
                isUploading={isUploading}
                setIsUploading={setIsUploading}
                onFinish={FinishUploadFile}
                togglePause={(i) =>
                  pauseList.includes(i) ? Restore(i) : Cancel(i)
                }
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
