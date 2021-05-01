import { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../../components/buttons/BlockButton'
import { RoundButton } from '../../components/buttons/RoundButton'

import { conn } from '../../client2server'
import { store } from '../../store'

import styles from './Flight.module.css'
import { PowerBlock } from '../../components/powerBlock/PowerBlock'
import { SystemsMobile } from './tabs/Systems--Mobile'
import { SystemsDesktop } from './tabs/Systems--Desktop'
import { UtilityBlock } from '../../components/utilityBlock/UtilityBlock'

const FLIGHT_TABS = Object.freeze({
  SYSTEMS: 'systems',
  QUANTUM: 'quantum',
  FUNCTIONS: 'functions',
})

export const FlightTab = () => {
  const { state } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  const [tab, setTab] = useState(FLIGHT_TABS.SYSTEMS)

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  const fontSize = isMobileDevice ? '16px' : '18px'

  return (
    <>
      {isMobileDevice ? (
        <div className={styles.top_row}>
          <BlockButton
            selected={tab === FLIGHT_TABS.SYSTEMS}
            style={{ fontSize }}
            onClick={() => setTab(FLIGHT_TABS.SYSTEMS)}>
            SYSTEMS
          </BlockButton>
          <BlockButton
            style={{ margin: '0 12px', fontSize }}
            selected={tab === FLIGHT_TABS.QUANTUM}
            onClick={() => setTab(FLIGHT_TABS.QUANTUM)}>
            QUANTUM
          </BlockButton>
          <BlockButton
            selected={tab === FLIGHT_TABS.FUNCTIONS}
            style={{ fontSize }}
            onClick={() => setTab(FLIGHT_TABS.FUNCTIONS)}>
            FUNCTIONS
          </BlockButton>
        </div>
      ) : (
        <UtilityBlock />
      )}

      {tab === FLIGHT_TABS.SYSTEMS && (
        <>
          <div className={styles.content__rows_container}>
            {isMobileDevice ? (
              <SystemsMobile send={send} />
            ) : (
              <SystemsDesktop send={send} />
            )}
          </div>
          <PowerBlock />
        </>
      )}

      {tab === FLIGHT_TABS.QUANTUM && (
        <>
          <div className={styles.content__rows_container}>
            <div style={{ position: 'relative' }}>
              <RoundButton
                text="ENGAGE QUANTUM"
                style={{ top: 0 }}
                onClick={() => send('macro:26')}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  height: '80px',
                  width: '100%',
                  backgroundColor: 'var(--black80)',
                  zIndex: 20,
                }}>
                <BlockButton
                  style={{ height: '100%' }}
                  onClick={() => send('macro:25')}>
                  INITIATE SPOOL
                </BlockButton>
              </div>
            </div>
          </div>

          <PowerBlock />
        </>
      )}

      {tab === FLIGHT_TABS.FUNCTIONS && (
        <>
          <div className={styles.content__rows_container}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro:3')}>
                CYCLE CAMERA
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton onClick={() => send('macro:20')}>VTOL</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>
                LIMITER TOGGLE*
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton onClick={() => send('macro:23')}>
                CRUISE CONTROL
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton danger onClick={() => send('macro:38')}>
                SELF DESTRUCT
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton danger onClick={() => send('macro:13')}>
                EJECT
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro:40')}>
                GIMBAL MODE
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton
                onClick={() => send('macro:24')}
                style={{ minWidth: '25%' }}>
                DECOUPLE
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro10')}
                style={{ minWidth: '25%' }}>
                GSAFE*
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro10')}
                style={{ minWidth: '25%' }}>
                ESP*
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro10')}
                style={{ minWidth: '25%' }}>
                WEAPONS*
              </BlockButton>
            </div>
          </div>

          <PowerBlock />
        </>
      )}
    </>
  )
}
