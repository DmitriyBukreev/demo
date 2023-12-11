import styles from "./table.module.scss";

type TaskProps = {
  children: JSX.Element;
};

export default function Table({ children }: TaskProps) {
  return (
    <>
      <h2 className={styles.title}>Select the plates</h2>
      <div className={styles.game}>
        <div className={styles.table}>
          <div className={styles.surface}>{children}</div>
          <div className={styles.edge}>
            <div className={styles.leg}></div>
            <div className={styles.leg}></div>
          </div>
        </div>
      </div>
    </>
  );
}
