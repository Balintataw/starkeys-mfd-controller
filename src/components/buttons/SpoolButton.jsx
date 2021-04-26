import { useMediaQuery } from 'react-responsive'

import styles from './SpoolButton.module.css'

export const SpoolButton = ({ onClick }) => {
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 440 })

  return (
    <>
      <div className={styles.button__radial_bg} style={{ transform: `scale(${isMobileDevice ? 0.7 : 1})`}}>
        <div className={styles.button__radial}></div>
      </div>
    </>
  )
}