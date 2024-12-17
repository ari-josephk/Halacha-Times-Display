import styles from "./page.module.css";
import { Fragment } from "react";

const Sidebar = ({ elements: dateMap }) => {
  const hasEvents = [...dateMap.values()].some(events => events.length > 0);

  return (
    <div className={`${styles.sidebar} ${styles.main}`}>
      {hasEvents ? (
        <ul>
          {[...dateMap.keys()].map(d => (
            dateMap.get(d).length > 0 && (
              <Fragment key={d}>
                <li className={styles.dateNotifier}>{d.render()}</li>
                {dateMap.get(d).map(e => (
                  <li className={styles.capsule} key={e.id}>
                    <span>{e.getEmoji()}</span>
                    <span>{e.observedIn()}</span>
                    <span>{e.render()}</span>
                  </li>
                ))}
              </Fragment>
            )
          ))}
        </ul>
      ) : (
        <p className={styles.dateNotifier}>No upcoming events</p>
      )}
    </div>
  );
};

export default Sidebar;