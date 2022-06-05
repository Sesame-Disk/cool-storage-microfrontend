import styles from "./FromSeafile.module.css";

const List = (props) => {
  return (
    <details className={styles.list}>
      <summary className={styles.list_text}>{props.title}</summary>
      {props.children}
    </details>
  );
};

const FromSeafile = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h4>{props.title}</h4>
      </div>
      <main className={styles.modalBody}>
        <form className={styles.modalForm}>
          <div className={styles.modal_from}>
            <h5>From:</h5>
            <input
              type="text"
              placeholder="Search..."
              className={styles.field}
            />
            <div className={styles.list_container}>
              <List title="My Libraries">
                <List title="Library1">
                  <List title="Folder1"></List>
                </List>
              </List>
              <List title="Seafile Libraries">
                <List title="Library1">
                  <List title="Folder1"></List>
                </List>
              </List>
            </div>
          </div>
          <div className={styles.modal_to}>
            <h5>To:</h5>
            <input
              type="text"
              placeholder="Search..."
              className={styles.field}
            />
            <div className={styles.list_container}>
              <List title="My Libraries">
                <List title="Library1">
                  <List title="Folder1"></List>
                </List>
              </List>
              <List title="Seafile Libraries">
                <List title="Library1">
                  <List title="Folder1"></List>
                </List>
              </List>
            </div>
          </div>
          <div className={styles.checkbox}>
            <input type="checkbox" name="move" id="move" />
            <label htmlFor="move">Move elements</label>
          </div>
        </form>
        <button className={styles.btn_action}>Submit</button>
      </main>
    </div>
  );
};

export default FromSeafile;
