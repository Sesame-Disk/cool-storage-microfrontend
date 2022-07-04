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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isUploader, setIsUploader] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPause, setIsPause] = useState();
  const [filePercent, setFilePercent] = useState([0]);
  const [totalSize, setTotalSize] = useState(0);
  const [uploadSize, setUploadSize] = useState(0);

  useEffect(() => {
    if (isUploading && currentIndex !== selectedFiles.length) {
      SendFileUpload(selectedFiles[currentIndex], currentIndex);
    }
  }, [isUploading, currentIndex]);

  useEffect(() => {
    selectedFiles.length === 0 && setUploadPercent(0);
  }, [selectedFiles]);

  useEffect(() => {
    setUploadPercent((uploadSize / totalSize) * 100);
  }, [uploadSize, totalSize]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    ChangeTotalSize();
    setIsUploading(true);
  };

  const SendFileUpload = (ufile, index) => {
    if (filePercent[index] === 100) return;
    let auxIsPause = [...isPause];
    auxIsPause[index] = true;
    setIsPause(auxIsPause);
    console.log("start uploader file: ", index);
    let uploader = new HugeUploader({
      endpoint: "http://localhost:3001/api/v1/single/upload",
      chunkSize: 5,
      file: ufile,
    });

    uploader.on("error", (err) => {
      console.error("Something bad happened", err.detail);
    });

    uploader.on("progress", (progress) => {
      let auxSize = ufile.size * (progress.detail / 100);
      setUploadSize(uploadSize + auxSize);
      filePercent[index] = progress.detail;
      setFilePercent(filePercent);
    });

    uploader.on("finish", (body) => {
      if (index === selectedFiles.length - 1) {
        setIsUploader(true);
      }
      setCurrentIndex(currentIndex + 1);
      // RemoveFile(index);
    });
  };

  const TogglePause = (index) => {
    let auxIsPause = [...isPause];
    auxIsPause[index] = !auxIsPause[index];
    setIsPause(auxIsPause);
    let uploader = new HugeUploader({
      endpoint: "http://localhost:3001/api/v1/single/upload",
      chunkSize: 5,
      file: selectedFiles[index],
    });

    uploader.togglePause();
  };

  const AddFile = (e) => {
    let newFiles = e.target.files;
    let aux = [...selectedFiles, ...newFiles];
    setSelectedFiles(aux);
    setIsPause(Array(aux.length).fill(false));
    setFilePercent(Array(aux.length).fill(0));
    e.target.value = null;
  };

  const RemoveFile = (index) => {
    let remove = [...selectedFiles];
    remove.splice(index, 1);
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

  const ChangeTotalSize = () => {
    let total = 0;
    selectedFiles.forEach((file) => {
      total += file.size;
    });
    setTotalSize(total);
  };

  const ClearAll = () => {
    setSelectedFiles([]);
    setCurrentIndex(0);
    setUploadPercent(0);
    setIsUploader(false);
    setIsUploading(false);
    setIsPause([]);
    setFilePercent([]);
    setUploadSize(0);
    setTotalSize(0);
  };

  const Close = () => {
    ClearAll();
    props.onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h4>{props.title}</h4>
      </div>
      <main className={styles.modalBody}>
        {!isUploading ? (
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
        ) : (
          <ProgressBar upload width={uploadPercent} text="Uploading..." />
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
                      <BiPause onClick={() => TogglePause(index)} />
                    ) : (
                      <>
                        <BiPlay onClick={() => TogglePause(index)} />
                        <BiTrash
                          color="red"
                          onClick={() => RemoveFile(index)}
                        />
                      </>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
        {selectedFiles.length > 0 && !isUploading && (
          <span className={styles.btn_terciary} onClick={() => ClearAll()}>
            clear
          </span>
        )}
        {isUploader && (
          <button
            className={`${styles.btn_primary} ${styles.btn_buttom}`}
            onClick={() => Close()}
          >
            Close
          </button>
        )}
      </main>
    </div>
  );
};

export default UploadFiles;
