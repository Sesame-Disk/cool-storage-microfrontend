import { useState } from "react";
import styles from "./Share.module.css";
import { BiBulb } from "react-icons/bi";

const Share = (onClose) => {
  const [tabActive, setTabActive] = useState(1);
  const [isPass, setIsPass] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(
      "https://cool-storage.com/example-link/30ead7e6-fd70-48ba-a786-5be9a36e60b6/"
    );
    alert("Copied link to clipboard");
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h3>Share</h3>
      </div>
      <div className={styles.modalBody}>
        <aside>
          <button
            type="button"
            className={`${styles.btn_link} ${tabActive === 1 && styles.active}`}
            onClick={() => setTabActive(1)}
          >
            Share Link
          </button>
          <button
            type="button"
            className={`${styles.btn_link} ${tabActive === 2 && styles.active}`}
            onClick={() => setTabActive(2)}
          >
            Internal Link
          </button>
          <button
            type="button"
            className={`${styles.btn_link} ${tabActive === 3 && styles.active}`}
            onClick={() => setTabActive(3)}
          >
            Share to user
          </button>
          <button
            type="button"
            className={`${styles.btn_link} ${tabActive === 4 && styles.active}`}
            onClick={() => setTabActive(4)}
          >
            Share to group
          </button>
        </aside>
        <main>
          {tabActive === 1 && (
            <form>
              <input
                type="checkbox"
                id="pass"
                name="pass"
                value="pass"
                checked={isPass}
                onChange={() => setIsPass(!isPass)}
                onClick={() => setIsPass(!isPass)}
              />
              <label htmlFor="pass">Add password protection</label>
              {isPass && (
                <>
                  <p className={styles.tip}>
                    <BiBulb />
                    Tip: at least 10 characters and has 3 of the following: num,
                    upper letter, lower letter and other symbols
                  </p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    className={styles.field}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Repeat your password"
                    required
                    className={styles.field}
                  />
                </>
              )}
              <h5 className={styles.permission}>Set Permission</h5>
              <ul className={styles.list}>
                <li>
                  <input
                    type="radio"
                    id="pad"
                    name="permission"
                    value="pad"
                    required
                  />
                  <label htmlFor="pad">Preview and download</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="po"
                    name="permission"
                    value="po"
                    required
                  />
                  <label htmlFor="po">Preview only</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="dau"
                    name="permission"
                    value="dau"
                    required
                  />
                  <label htmlFor="dau">Download and upload</label>
                </li>
              </ul>
              <button className={styles.btn_action}>Generate</button>
            </form>
          )}
          {tabActive === 2 && (
            <>
              <p className={styles.tip}>
                <BiBulb />
                An internal link is a link to a file or folder that can be
                accessed by users with read permission to the file or folder.
              </p>
              <a href="/" className={styles.link} target="_blank">
                https://cool-storage.com/example-link/30ead7e6-fd70-48ba-a786-5be9a36e60b6/
              </a>
              <button className={styles.btn_action} onClick={() => copyLink()}>
                Copy
              </button>
            </>
          )}
          {tabActive === 3 && (
            <form>
              {/* //todo: ambos inputs son desplegables */}
              <input
                type="text"
                placeholder="Searsh users..."
                className={styles.field}
              />
              <input
                type="text"
                placeholder="Select Permission"
                className={styles.field}
              />
              <button className={styles.btn_action}>Submit</button>
            </form>
          )}
          {tabActive === 4 && (
            <form>
              {/* //todo: ambos inputs son desplegables */}
              <input
                type="text"
                placeholder="Searsh groups..."
                className={styles.field}
              />
              <input
                type="text"
                placeholder="Select Permission"
                className={styles.field}
              />
              <button className={styles.btn_action}>Submit</button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default Share;
