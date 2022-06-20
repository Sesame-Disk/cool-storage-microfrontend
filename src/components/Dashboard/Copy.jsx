import styles from "./Copy.module.css";

const List = (props) => {
  return (
    <details className={styles.list}>
      <summary className={styles.list_text}>{props.title}</summary>
      {props.children}
    </details>
  );
};

const Copy = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h4>{props.title}</h4>
      </div>
      <main className={styles.modalBody}>
        <form className={styles.modalForm}>
          <input type="text" placeholder="Search..." className={styles.field} />
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
        </form>
        <button className={styles.btn_action}>Submit</button>
      </main>
    </div>
  );
};

export default Copy;
