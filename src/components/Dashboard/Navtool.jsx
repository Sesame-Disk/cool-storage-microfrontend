import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navtool.module.css";
import User from "./User_dropdown";
import HandleClickOut from "../Utils/HandleClickOut";

const Navtool = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Link to=".">
        <img
          src="logo.png"
          alt="logo"
          className={styles.logo}
          data-testid="logoImg"
        />
      </Link>
      <HandleClickOut
        onClickOutside={() => setIsOpen(false)}
        style={{ display: "inline-block" }}
      >
        <User show={isOpen} setShow={setIsOpen} />
      </HandleClickOut>
    </div>
  );
};

export default Navtool;
