import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles["text-centered"]}>
          <p>
            <strong>NiHao Cloud</strong> by <a href="/">link</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
