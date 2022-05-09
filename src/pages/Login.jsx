import { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`${styles.container}`}>
      <section className={`${styles.section}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome to</h1>
          <a href="/">
            <img
              className={styles.logo}
              src="logo192.png"
              alt="logo"
              height="100rem"
              width="100rem"
              loading="eager"
            />
          </a>
        </header>

        <div className={styles.alternative}>
          <a href="/">
            <img
              src="/images/google_logo.png"
              alt="Google"
              height="30rem"
              loading="eager"
              className={styles.altimg}
            />
          </a>
          <span className={styles.separator} />
          <a href="/">
            <img
              src="/images/facebook_logo.png"
              alt="Facebook"
              height="30rem"
              loading="eager"
              className={styles.altimg}
            />
          </a>
          <span className={styles.separator} />
          <a href="/">
            <img
              src="/images/linkedIn_logo.png"
              alt="LinkedIn"
              height="30rem"
              loading="eager"
              className={styles.altimg}
            />
          </a>
          <span className={styles.separator} />
          <a href="/signup" className={`${styles.link} ${styles.signup}`}>
            Signup
          </a>
        </div>

        <form action="" method="post" className={styles.form}>
          <input
            className={`${styles.input}`}
            type="email"
            name="Email"
            placeholder="user@email.com"
          />
          <input
            className={`${styles.input}`}
            type="password"
            name="Password"
            placeholder="Password"
          />
          <span className={`${styles.checkbox}`}>
            <input
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              onClick={checkClick}
            />
            <label for="checkbox" className={styles.link} onClick={checkClick}>
              Remember me for 7 days
            </label>
          </span>
          <button className={`${styles.button}`} type="submit">
            Login
          </button>
        </form>
      </section>
      <footer>
        <a className={`${styles.link} ${styles.footer}`} href="/">
          Privacy Policy | Terms of Service
        </a>
      </footer>
    </div>
  );
};

export default Login;
