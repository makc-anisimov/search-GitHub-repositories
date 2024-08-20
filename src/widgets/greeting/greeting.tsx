import styles from "./greeting.module.scss";

export const Greeting = () => {
  return (
    <div className={styles.greeting}>
      <h1 className={styles.greeting__title}>Добро пожаловать</h1>
    </div>
  );
};
