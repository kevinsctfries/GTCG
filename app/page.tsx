import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>GTCG</h1>
      <p className={styles.subtitle}>
        Earn cards and points for your GitHub activity.
      </p>
    </main>
  );
}
