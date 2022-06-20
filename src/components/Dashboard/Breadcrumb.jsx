import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ crumbs }) => {
  function isLast(index) {
    return index === crumbs.length - 1;
  }

  return (
    <ol className={styles.breadcrumb}>
      {crumbs.map((crumb, ci) => {
        return (
          <li key={ci} className={styles.breadcrumb_item}>
            <Link
              className={`${styles.btn_link} ${
                isLast(ci) ? styles.disabled : ""
              }`}
              to={crumb.link}
            >
              {crumb.text}
            </Link>
            {!isLast(ci) && (
              <span className={styles.breadcrumb_divider}>/</span>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Breadcrumb;
