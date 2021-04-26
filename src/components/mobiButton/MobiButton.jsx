import styles from './MobiButton.module.css'

export const MobiButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.mobi_button__circle}>
      <div className={styles.mobi_button__grid}>
        <div className={styles.mobi_button__block}></div>
        <div className={styles.mobi_button__block}></div>
        <div className={styles.mobi_button__block}></div>
        <div className={styles.mobi_button__block}></div>
        <div className={styles.mobi_button__block}></div>
        <div className={styles.mobi_button__block}></div>
      </div>
    </button>
  )
}