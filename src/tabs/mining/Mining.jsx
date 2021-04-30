import { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../../components/buttons/BlockButton'
import { PowerBlock } from '../../components/powerBlock/PowerBlock'

import { conn } from '../../client2server'
import { store } from '../../store'

import styles from './Mining.module.css'

const MINING_TABS = Object.freeze({
  POWER: 'power',
  SCANNING: 'scanning',
})

export const MiningTab = () => {
  const { state } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  const [tab, setTab] = useState(MINING_TABS.POWER)

  function handleClick(macro) {
    conn(state.hostip, state.fileid, macro)
  }

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
                style={{ marginRight: '12px' }}
                onClick={() => handleClick('macro')}>
                MINING MODE
              </BlockButton>
              <BlockButton onClick={() => handleClick('macro')}>
                SCAN MODE
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ height: '80px' }}
                onClick={() => handleClick('macro')}>
                PING SCANNER
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ marginRight: '12px' }}
                onClick={() => handleClick('macro')}>
                DECREASE RANGE
              </BlockButton>
              <BlockButton onClick={() => handleClick('macro')}>
                INCREASE RANGE
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ height: '80px' }}
                onClick={() => handleClick('macro')}>
                ACTIVATE LASER
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                style={{ marginRight: '12px' }}
                onClick={() => handleClick('macro')}>
                FRACTURE MODE
              </BlockButton>
              <BlockButton onClick={() => handleClick('macro')}>
                EXTRACTION MODE
              </BlockButton>
            </div>
          </div>
        </>
      )}

      {tab === MINING_TABS.SCANNING && (
        <>
          <div className={styles.content__rows_container}>
            <span>scan it</span>
          </div>
        </>
      )}

      <PowerBlock />
    </>
  )
}
