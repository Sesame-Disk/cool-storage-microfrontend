import { useState } from "react";
import styles from "./Navtool.module.css";
import User from "./User_dropdawn";

const Navtool = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <a href="/">
        <img src="logo.png" alt="logo" className={styles.logo} />
      </a>
      <User
        show={isOpen}
        setShow={(value) => setIsOpen(value)}
        onClickOutside={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Navtool;
