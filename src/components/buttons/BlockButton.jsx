import styles from './BlockButton.module.css'

export const BlockButton = ({ children, onClick, selected, style, danger }) => (
  <button
    onClick={onClick}
    style={{
      ...style,
      backgroundColor: danger
        ? 'var(--danger10)'
        : selected
        ? 'var(--primary20)'
        : undefined,
      border: danger ? '1px solid var(--danger10)' : undefined,
    }}
    className={styles.block_button}>
    {children}
  </button>
)
