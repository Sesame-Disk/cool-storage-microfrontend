import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div
      className={`${styles.modal_window} ${
        props.isOpen ? styles.modal_open : ""
      }`}
    >
      <div className={styles.modal_content} style={{ width: props.width }}>
        {props.onClose && (
          <button
            className={styles.modal_close}
            onClick={() => props.onClose()}
          >
            Close
          </button>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
