import { useState, useEffect } from "react";
import styles from "./UploadItem.module.css";
import HugeUploader from "huge-uploader";
import sha256 from "crypto-js/sha256";

const UploadItem = ({ file, index, ...props }) => {
  const [filePercent, setFilePercent] = useState(0);
  const [uploader, setUploader] = useState(null);
  const [hash, setHash] = useState("");
  let src = "/images/file_preview.png";
  let cover = "";
  if (file.type.includes("image")) {
    src = URL.createObjectURL(file);
    cover = styles.img__cover;
  }

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setHash(sha256(e.target.result).toString());
    };
    reader.readAsText(file);
  }, []);

  useEffect(() => {
    if (hash !== "") {
      setUploader(
        new HugeUploader({
          endpoint: "http://localhost:3001/api/v1/single/upload",
          chunkSize: 4,
          file: file,
          headers: {
            "uploader-file-name": file.name,
            "uploader-file-hash": hash,
          },
        })
      );
    }
  }, [hash]);

  useEffect(() => {
    if (uploader !== null) {
      console.log(uploader);

      uploader.on("error", (err) => {
        console.error("Something bad happened", err.detail);
      });

      uploader.on("progress", (progress) => {
        let auxSize = file.size * (progress.detail / 100);
        if (isNaN(auxSize)) {
          auxSize = 0;
        }
        props.setUploadSize(auxSize);
        let Percent = progress.detail;
        console.log(progress.detail, "%");
        setFilePercent(Percent);
      });

      uploader.on("finish", (body) => {
        props.increaseIndex();
      });
    }
  }, [uploader]);

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
  const TogglePause = () => {
    let auxIsPause = [...props.isPause];
    if (index === props.currentIndex) {
      // uploader.togglePause()
      let auxUploader = uploader;
      auxUploader.togglePause();
      setUploader(auxUploader);
    }
    auxIsPause[index] = !auxIsPause[index];
    props.setIsPause(auxIsPause);
  };

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
      <span className={styles.percent}>{filePercent}%</span>
      <div className={styles.modal_preview_item_actions}>
        {/* //todo: togglePause func */}
        {filePercent !== 100 &&
          (props.isPause[index] ? (
            <span className={styles.btn_terciary} onClick={() => TogglePause()}>
              restore
            </span>
          ) : (
            <span className={styles.btn_terciary} onClick={() => TogglePause()}>
              cancel
            </span>
          ))}
      </div>
    </div>
  );
};

export default UploadItem;
