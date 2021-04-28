import styles from './BlockButton.module.css'

export const BlockButton = ({ children, onClick, selected, style }) => {
  return (
    <button onClick={onClick} style={{
      backgroundColor: selected ? 'var(--primary20)' : undefined,
      ...style,
    }} className={styles.block_button}>{children}</button>
  )
}