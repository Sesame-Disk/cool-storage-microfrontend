import styles from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  if (props.upload) {
    return (
      <div
        className={`${styles.progress_bar_container} ${
          props.width === 100 && styles.progress_bar_green
        }`}
        data-testid="progress-upload"
      >
        <div
          className={`${styles.progress_bar} ${
            props.width === 100 && styles.progress_bar_green
          }`}
          style={{ width: `${props.width}%` }}
        >
          {props.text && (
            <span className={styles.progress_bar_text}>{props.text}</span>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.progress_bar_container} data-testid="progress">
      <div className={styles.progress_bar} style={{ width: `${props.width}%` }}>
        {props.text && (
          <span className={styles.progress_bar_text}>{props.text}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
