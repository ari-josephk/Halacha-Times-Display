import styles from "./page.module.css";

const Sidebar = ({ elements }) => {
  return (
    <div className={`${styles.sidebar} ${styles.main}`}>
      <ul>
        {elements.map((e, index) => (
          <li key={index} className={styles.capsule}>
            <span>{e.getEmoji()}</span>
            <span>{e.observedIn()}</span>
            <span>{e.render()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;