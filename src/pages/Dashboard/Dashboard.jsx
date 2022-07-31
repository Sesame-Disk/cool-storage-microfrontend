import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container} data-testid="dash-content">
      <div className={styles.content}>
        <div className={styles["table-concept"]}>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={() => console.log("Check change")}
                  />
                </th>
                <th>Name</th>
                <th>Size</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => console.log("Check change")}
                  />
                </td>
                <td>This is Item number 1-1</td>
                <td>This is Item number 2-1</td>
                <td>This is Item number 3-1</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => console.log("Check change")}
                  />
                </td>
                <td>This is Item number 1-2</td>
                <td>This is Item number 2-2</td>
                <td>This is Item number 3-2</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => console.log("Check change")}
                  />
                </td>
                <td>This is Item number 1-3</td>
                <td>This is Item number 2-3</td>
                <td>This is Item number 3-3</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => console.log("Check change")}
                  />
                </td>
                <td>This is Item number 1-4</td>
                <td>This is Item number 2-4</td>
                <td>This is Item number 3-4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
