import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <main className={styles.container}>
      <h1>Settings</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Email Notifications Submitted");
        }}
      >
        <h2>Profile Settings</h2>
        <div className={styles.row}>
          <span className={styles.avatar_label}>Avatar:</span>
          <img
            src="/images/profile_avatar.png"
            className={styles.avatar}
            alt="avatar"
            width="100rem"
            loading="eager"
          />
        </div>
        <div className={styles.row}>
          <span>Name:</span>
          <input type="text" className={styles.field} placeholder="Jon Doe" />
        </div>
        <div className={styles.row}>
          <span>Contact Email:</span>
          <input
            type="text"
            className={styles.field}
            placeholder="jondoe@email.com"
          />
          <span>Your notifications will be send to this email.</span>
        </div>
        <button className={styles.btn_action}>Submit</button>
      </form>

      <h2>Password</h2>
      <button className={styles.btn_action}>Update</button>

      <h2>Language Setting</h2>
      <select>
        <option value="en" className={styles.options}>
          English
        </option>
        <option value="es" className={styles.options}>
          Spanish
        </option>
      </select>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Email Notifications Submitted");
        }}
      >
        <h2>Email Notification</h2>
        <h3>Notifications of file changes</h3>
        <span>
          The lis of added, deleted and modified files will be sent to your
          mailbox.
        </span>
        <ul className={styles.list}>
          <li>
            <input
              type="radio"
              id="dont"
              name="mail"
              value="dont"
              defaultChecked="checked"
            />
            <label htmlFor="dont">Don't send</label>
          </li>
          <li>
            <input type="radio" id="hour" name="mail" value="hour" />
            <label htmlFor="hour">Per hour</label>
          </li>
          <li>
            <input type="radio" id="4hours" name="mail" value="4hours" />
            <label htmlFor="4hours">Per 4 hours</label>
          </li>
          <li>
            <input type="radio" id="day" name="mail" value="day" />
            <label htmlFor="day">Per day</label>
          </li>
          <li>
            <input type="radio" id="week" name="mail" value="week" />
            <label htmlFor="weel">Per week</label>
          </li>
        </ul>

        <h3>Notifications of collection</h3>
        <span>
          Whether the notifications of collaboration such as sharing library or
          joining group should be sent to your mailbox
        </span>
        <ul className={styles.list}>
          <li>
            <input
              type="radio"
              id="nosend"
              name="collaboration"
              value="nosend"
            />
            <label htmlFor="nosend">Don't send emails</label>
          </li>
          <li>
            <input
              type="radio"
              id="hournoread"
              name="collaboration"
              value="hournoread"
              defaultChecked="checked"
            />
            <label htmlFor="hournoread">
              Per hour ( If notifications have not been read within one hour,
              they will be sent to your mailbox.)
            </label>
          </li>
        </ul>
        <button type="submit" className={styles.btn_action}>
          Submit
        </button>
      </form>

      <h2>Delete Account</h2>
      <span>This operation will not be reverted. Please think twice!</span>
      <button type="button" className={styles.btn_action}>
        Delete
      </button>
    </main>
  );
};

export default Settings;
