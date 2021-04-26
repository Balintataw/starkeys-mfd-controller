import styles from './BlockButton.module.css'

export const BlockButton = ({ children, onClick, selected }) => {
  return (
    <button onClick={onClick} style={{ backgroundColor: selected ? 'var(--blue20)' : undefined }} className={styles.block_button}>{children}</button>
  )
}