import { useMediaQuery } from 'react-responsive'

import styles from './RoundButton.module.css'

export const RoundButton = ({ onClick, text }) => {
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  return (
    <button
      onClick={onClick}
      className={styles.button__radial_bg}
      style={{ transform: `scale(${isMobileDevice ? 0.9 : 1})` }}>
      <div className={styles.button__radial}>{text}</div>
    </button>
  )
}
