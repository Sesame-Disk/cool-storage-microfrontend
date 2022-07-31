import { Link } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";
import styles from "./User_dropdown.module.css";
import Dropdown from "../Utils/Dropdown";
import Logout from "../auth/Logout";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import ProgressBar from "../Utils/ProgressBar";

const User_dropdawn = ({ show, setShow }) => {
  const authContext = useContext(AuthContext);
  const info = authContext.user;
  return (
    <div className={styles.profile}>
      <div
        className={styles.dropdown_button}
        onClick={() => setShow(!show)}
        data-testid="user_icon_dropdown"
      >
        <img
          src={info.avatar_url}
          alt={info.avatar_url}
          className={styles.avatar}
        />
        <BiCaretDown
          color="#fff"
          className={`${styles.caret} ${show ? styles.caret_open : ""}`}
        />
      </div>
      <Dropdown isOpen={show} onClose={setShow}>
        <div className={styles.dropdown_header} data-testid="user_dropdown">
          <img
            src={info.avatar_url}
            alt={info.avatar_url}
            className={styles.avatar_header}
            width="1rem"
          />
          <span>{info.name}</span>
        </div>
        <div className={styles.dropdown_subheader}>
          <span>
            Used: {info.usage} MB / {info.total} MB
          </span>
          <ProgressBar value={info.space_usage} width="50" />
        </div>
        <Link to="/" className={styles.dropdown_item}>
          Home
        </Link>
        <Link to="settings" className={styles.dropdown_item}>
          Settings
        </Link>
        <Logout className={styles.dropdown_item} />
      </Dropdown>
    </div>
  );
};

export default User_dropdawn;
