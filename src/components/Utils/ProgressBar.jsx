import styles from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  return (
    <div class={styles.progress_bar_container}>
      <div class={styles.progress_bar} style={{ width: props.width }}>
        {props.text && (
          <span class={styles.progress_bar_text}>{props.text}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
