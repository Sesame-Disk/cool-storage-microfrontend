import styles from "./NotMatch.module.css";

const NotMatch = () => {
  return (
    <div>
      <h1 className={styles["title"]}>404</h1>
      <h2 className={styles["subtitle"]}>Page not found</h2>
    </div>
  );
};

export default NotMatch;
