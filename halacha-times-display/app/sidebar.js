import styles from "./page.module.css";
import { Fragment } from "react";

/**
 * Sidebar component that displays a list of events for given dates.
 *
 * @param {Object} props - The component props.
 * @param {Map} props.dateMap - A map where keys are date objects and values are arrays of event objects.
 * @returns {JSX.Element} The rendered sidebar component.
 */
const Sidebar = ({ dateMap }) => {
  const hasEvents = [...dateMap.values()].some(events => events.length > 0);

  return (
    <div className={`${styles.sidebar} ${styles.main}`}>
      {hasEvents ? (
        <ul>
          {[...dateMap.keys()].map(d => (
            dateMap.get(d).length > 0 && (
              <Fragment key={d.abs()}>
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