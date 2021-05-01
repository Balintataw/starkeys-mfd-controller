import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { BlockButton } from '../../../components/buttons/BlockButton'

import styles from './Mining--Mobile.module.css'

const MINING_TABS = Object.freeze({
  POWER: 'power',
  SCANNING: 'scanning',
})

export const MiningMobile = ({ send }) => {
  const [tab, setTab] = useState(MINING_TABS.POWER)

  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  const fontSize = isMobileDevice ? '14px' : '18px'

  return (
    <>
      <div className={styles.top_row}>
        <BlockButton
          style={{ marginRight: '12px' }}
          selected={tab === MINING_TABS.POWER}
          onClick={() => setTab(MINING_TABS.POWER)}>
          POWER
        </BlockButton>
        <BlockButton
          selected={tab === MINING_TABS.SCANNING}
          onClick={() => setTab(MINING_TABS.SCANNING)}>
          SCANNING
        </BlockButton>
      </div>

      {tab === MINING_TABS.POWER && (
        <>
          <div className={styles.content__rows_container}>
            <div className={styles.row}>
              <BlockButton
                style={{ height: '80px' }}
                onClick={() => send('macro:29')}>
                MINING MODE
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ height: '80px' }}
                onClick={() => send('macro:88')}>
                ACTIVATE LASER
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ height: '80px' }}
                onClick={() => send('macro:89')}>
                TOGGLE FRACTURE / EXTRACTION MODE
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro:90')}>
                TOGGLE LASER GIMBAL
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ marginRight: '12px', fontSize }}
                onClick={() => send('macro:91')}>
                CONSUMABLE 1
              </BlockButton>
              <BlockButton
                style={{ marginRight: '12px', fontSize }}
                onClick={() => send('macro:92')}>
                CONSUMABLE 2
              </BlockButton>
              <BlockButton
                style={{ fontSize }}
                onClick={() => send('macro:93')}>
                CONSUMABLE 3
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton danger onClick={() => send('macro:94')}>
                JETTISON CARGO
              </BlockButton>
            </div>
          </div>
        </>
      )}

      {tab === MINING_TABS.SCANNING && (
        <>
          <div className={styles.content__rows_container}>
            <div className={styles.row}>
              <BlockButton
                style={{ height: '80px' }}
                onClick={() => send('macro:9')}>
                SCAN MODE
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ height: '80px' }}
                onClick={() => send('macro:37')}>
                PING SCANNER FULL
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ height: '80px' }}
                onClick={() => send('macro:85')}>
                PING SCANNER HALF
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ marginRight: '12px' }}
                onClick={() => send('macro:86')}>
                DECREASE RANGE
              </BlockButton>
              <BlockButton onClick={() => send('macro:87')}>
                INCREASE RANGE
              </BlockButton>
            </div>
          </div>
        </>
      )}
    </>
  )
}
