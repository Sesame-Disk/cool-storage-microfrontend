import { Link } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";
import styles from "./User_dropdown.module.css";
import Dropdown from "../Utils/Dropdown";

const User_dropdawn = ({ show, setShow }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.dropdown_button} onClick={() => setShow(!show)}>
        <span className={styles.avatar}>A</span>
        <BiCaretDown
          color="#fff"
          className={`${styles.caret} ${show ? styles.caret_open : ""}`}
        />
      </div>
      <Dropdown isOpen={show} onClose={setShow}>
        <Link to="/">Link</Link>
      </Dropdown>
    </div>
  );
};

export default User_dropdawn;
