import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ value }) => {
  const fill = {
    transform: `translate(${value}%,0)`,
    transformDuration: "2s",
    backgroundColor: `${value === 100 ? "#4bb543" : "#e76f51"}`,
  };
  return (
    <div
      className={styles.progress_bar__container}
      style={{
        boxShadow: `0 0 5px ${value === 100 ? "#4bb543" : "#e76f51"}`,
      }}
    >
      <div className={`${styles.progress_bar}`} style={fill}>
        <span className={value !== 100 ? styles.progress_bar__text : null}>
          Uploaded Successfully!
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;

// if (state == endState) {
//   gsap.to(progressBar, {
//     x: `${state}%`,
//     duration: 2,
//     backgroundColor: "#4895ef",
//     onComplete: () => {
//       progressBarText.style.display = "initial";
//       progressBarContainer.style.boxShadow = "0 0 5px #4895ef";
//     },
//   });
// } else {
//   gsap.to(progressBar, {
//     x: `${state}%`,
//     duration: 2,
//   });
// }
