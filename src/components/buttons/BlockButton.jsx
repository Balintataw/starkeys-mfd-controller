import styles from './BlockButton.module.css'

export const BlockButton = ({
  children,
  onClick,
  selected,
  style,
  danger,
  disabled = false,
}) => (
  <button
    onClick={disabled ? () => {} : onClick}
    style={{
      ...style,
      backgroundColor: danger
        ? 'var(--danger10)'
        : selected
        ? 'var(--primary20)'
        : undefined,
      border: danger ? '1px solid var(--danger)' : undefined,
      opacity: disabled ? 0.5 : 1,
      color: danger ? 'var(--danger)' : undefined,
    }}
    className={styles.block_button}>
    {children}
  </button>
)
