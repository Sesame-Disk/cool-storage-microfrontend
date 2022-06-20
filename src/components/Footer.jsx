import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles["text-centered"]}>
          <p>
            <strong>Cool Storage</strong> by{" "}
            <a href="https://sesamedisk.com/">NiHao Cloud</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
