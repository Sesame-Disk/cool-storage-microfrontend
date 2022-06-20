import { Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import Navtool from "../Dashboard/Navtool";
import Toolbar from "../Dashboard/Toolbar";
import styles from "./Dash.module.css";

const Dash = () => {
  return (
    <>
      <Navtool />
      <div className={styles.container}>
        <Sidebar className={styles.sidebar} />
        <div className={styles.content}>
          <Toolbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dash;
