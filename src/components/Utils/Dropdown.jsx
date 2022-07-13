import styles from "./Dropdown.module.css";

const Dropdown = ({ isOpen, children, ...props }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.dropdown} data-testid="dropdown">
          <div
            className={`${props.center && styles.dropdown_content_center} ${
              styles.dropdown_content
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
