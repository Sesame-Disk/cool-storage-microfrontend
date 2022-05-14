import { useEffect, useRef } from "react";
import { BiCaretDown } from "react-icons/bi";
import styles from "./User_dropdawn.module.css";

const User_dropdawn = ({ show, setShow, onClickOutside }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div ref={ref} className={styles.dropdown}>
      <div className={styles.dropdown_button} onClick={() => setShow(!show)}>
        <span className={styles.avatar}>A</span>
        <BiCaretDown
          color="#fff"
          className={`${styles.caret} ${show ? styles.caret_open : ""}`}
        />
      </div>
      {show && (
        <div className={styles.dropdown_content}>
          <a href="/">
            <span className={styles.avatar}>A</span>
            <span className={styles.name}>
              <span className={styles.name_first}>A</span>
              <span className={styles.name_last}>A</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default User_dropdawn;
