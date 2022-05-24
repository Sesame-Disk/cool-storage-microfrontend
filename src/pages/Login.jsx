import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import styles from "./Login.module.css";
import AuthContext from "../store/auth-context";
import { GetToken } from "../components/auth/FetchData";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const checkClick = () => {
    setIsChecked(!isChecked);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    GetToken(email, password, (err, token) => {
      if (err) {
        setError(err);
        return;
      }
      authContext.login(token, 1000 * 60);
      navigate("../dashboard", { replace: true });
    });
  };

  return (
    <div className={`${styles.container}`}>
      <section className={`${styles.section}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome to</h1>
          <Link to="/">
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
          <a
            href="https://sesamedisk.com/register/"
            className={`${styles.link} ${styles.signup}`}
          >
            Signup
          </a>
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

        <form onSubmit={submitHandler} className={styles.form}>
          <input
            className={`${styles.input}`}
            type="email"
            name="Email"
            placeholder="user@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={`${styles.input}`}
            type="password"
            name="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div>
              <BiError className={styles.icon} />
              <span className={styles.error}>{error}</span>
            </div>
          )}
          <span className={`${styles.checkbox}`}>
            <input
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              onClick={checkClick}
              onChange={checkClick}
            />
            <label
              htmlFor="checkbox"
              className={styles.link}
              onClick={checkClick}
            >
              Remember me for 7 days
            </label>
          </span>
          <button className={`${styles.button}`} type="submit">
            Login
          </button>
          <a
            href="https://app.nihaoconsult.com/accounts/password/reset/"
            className={`${styles.link} ${styles.forgot}`}
          >
            Forgot password?
          </a>
        </form>
      </section>
      <footer>
        <a
          className={`${styles.link} ${styles.footer}`}
          href="https://www.nihaocloud.com/privacy-policy/"
        >
          Privacy Policy
        </a>
        <span className={styles.footer}> | </span>
        <a
          className={`${styles.link} ${styles.footer}`}
          href="https://www.nihaocloud.com/privacy-policy/#terms_of_service"
        >
          Terms of Service
        </a>
      </footer>
    </div>
  );
};

export default Login;
