import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../../components/buttons/BlockButton'
import { SpoolButton } from '../../components/buttons/SpoolButton'

import styles from './Mining.module.css'

export const MiningTab = () => {
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 440 })

  const [tab, setTab] = useState(0)

  return (
    <>
      <div className={styles.top_row}>
        <BlockButton selected={tab === 0} onClick={() => setTab(0)}>SCANNING</BlockButton>
        <BlockButton style={{ margin: '0 12px' }} selected={tab === 1} onClick={() => setTab(1)}>QUANTUM</BlockButton>
        <BlockButton selected={tab === 2} onClick={() => setTab(2)}>FUNCTIONS</BlockButton>
      </div>

      {tab === 1 && (
        <>
          <div className={styles.content__rows_container}>
            <div className={styles.content__row}>
              <div className={styles.content__row_left} onClick={() => {}}>left</div>
              <div className={styles.content__row_right} onClick={() => {}}>right</div>
            </div>
            <div className={styles.content__row}>
              <div className={styles.content__row_left} onClick={() => {}}>left</div>
              <div className={styles.content__row_right} onClick={() => {}}>right</div>
            </div>
            <div className={styles.content__row}>
              <div className={styles.content__row_left} onClick={() => {}}>left</div>
              <div className={styles.content__row_right} onClick={() => {}}>right</div>
            </div>

            <SpoolButton onClick={() => null}/>

          </div>
        </>
      )}

      <div className={styles.bottom_row}> bottom row </div>
    </>
  )
}