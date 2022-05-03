import { useLocation } from "react-router-dom";
import styles from "./NotMatch.module.css";

const NotMatch = () => {
  const location = useLocation();
  return (
    <div>
      <h1 className={styles["title"]}>404</h1>
      <h2 className={styles["subtitle"]}>
        Page ({location.pathname}) not found
      </h2>
    </div>
  );
};

export default NotMatch;
