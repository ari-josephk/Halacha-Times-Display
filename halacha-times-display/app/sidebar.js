import styles from "./page.module.css";
import { Fragment } from "react";

const Sidebar = ({ elements: dateMap }) => {
  return (
    <div className={`${styles.sidebar} ${styles.main}`}>
      <ul>
        {
        [...dateMap.keys()].map((d => (
          dateMap.get(d).length > 0 && (
            <Fragment key={d}>
              <li className={styles.dateNotifier}>{d.render()}</li>
              {dateMap.get(d).map(e => (
                <li className={styles.capsule}>
                  <span>{e.getEmoji()}</span>
                  <span>{e.observedIn()}</span>
                  <span>{e.render()}</span>
                </li>
              ))}
            </Fragment>
          )
        )))}
      </ul>
    </div>
  );
};

export default Sidebar;