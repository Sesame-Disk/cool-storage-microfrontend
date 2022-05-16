import { useState } from "react";
import { Link } from "react-router-dom";
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
          <Link typeof=".">
            <img
              className={styles.logo}
              src="logo192.png"
              alt="logo"
              height="100rem"
              width="100rem"
              loading="eager"
            />
          </Link>
        </header>

        <div className={styles.alternative}>
          <Link to="signup" className={`${styles.link} ${styles.signup}`}>
            Signup
          </Link>
          <span className={styles.separator} />

          <select
            name="language"
            id="language"
            className={`${styles.link} ${styles.language}`}
          >
            <option value="spanich">English</option>
            <option value="spanich">Spanish</option>
          </select>
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
          <Link to="." className={`${styles.link} ${styles.forgot}`}>
            Forgot password?
          </Link>
        </form>
      </section>
      <footer>
        <Link className={`${styles.link} ${styles.footer}`} to=".">
          Privacy Policy | Terms of Service
        </Link>
      </footer>
    </div>
  );
};

export default Login;
