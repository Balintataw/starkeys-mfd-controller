import { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../../components/buttons/BlockButton'
import { SpoolButton } from '../../components/buttons/SpoolButton'

import { conn } from '../../client2server'
import { store } from '../../store'

import styles from './Flight.module.css'
import { PowerBlock } from '../../components/powerBlock/PowerBlock'

const FLIGHT_TABS = Object.freeze({
  SYSTEMS: 'systems',
  QUANTUM: 'quantum',
  FUNCTIONS: 'functions',
})

export const FlightTab = () => {
  const { state } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 440 })

  const [tab, setTab] = useState(FLIGHT_TABS.SYSTEMS)

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  return (
    <>
      <div className={styles.top_row}>
        <BlockButton
          selected={tab === FLIGHT_TABS.SYSTEMS}
          onClick={() => setTab(FLIGHT_TABS.SYSTEMS)}>
          SYSTEMS
        </BlockButton>
        <BlockButton
          style={{ margin: '0 12px' }}
          selected={tab === FLIGHT_TABS.QUANTUM}
          onClick={() => setTab(FLIGHT_TABS.QUANTUM)}>
          QUANTUM
        </BlockButton>
        <BlockButton
          selected={tab === FLIGHT_TABS.FUNCTIONS}
          onClick={() => setTab(FLIGHT_TABS.FUNCTIONS)}>
          FUNCTIONS
        </BlockButton>
      </div>

      {tab === FLIGHT_TABS.SYSTEMS && (
        <>
          <div className={styles.content__rows_container}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro:10')}>
                FLIGHT READY
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro:27')}>
                LANDING GEAR
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton onClick={() => send('macro:28')}>
                AUTO LAND
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro:26')}>
                ENGAGE QUANTUM
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro:25')}>
                INITIATE SPOOL
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton onClick={() => send('macro:9')}>
                SCANNING
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro:11')}>LIGHTS</BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton onClick={() => send('macro:12')}>
                EXIT SEAT
              </BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton
                onClick={() => send('macro:21')}
                style={{ minWidth: '25%' }}>
                OPEN DOORS
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro:21')}
                style={{ minWidth: '25%' }}>
                CLOSE DOORS
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro:22')}
                style={{ minWidth: '25%', height: '100%' }}>
                LOCK
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro:22')}
                style={{ minWidth: '25%', height: '100%' }}>
                UNLOCK
              </BlockButton>
            </div>
          </div>
          <PowerBlock />
        </>
      )}

      {tab === FLIGHT_TABS.QUANTUM && (
        <>
          <div className={styles.content__rows_container}>
            {isMobileDevice ? (
              <div style={{ position: 'relative' }}>
                <SpoolButton onClick={() => send('macro:26')} />
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
            ) : (
              <>
                <div className={styles.content__row}>
                  <button
                    className={styles.content__row_left}
                    onClick={() => send('macro:10')}>
                    FLIGHT READY
                  </button>
                  <button
                    className={styles.content__row_right}
                    onClick={() => {}}>
                    right
                  </button>
                </div>
                <div className={styles.content__row}>
                  <button
                    className={styles.content__row_left}
                    onClick={() => {}}>
                    left
                  </button>
                  <button
                    className={styles.content__row_right}
                    onClick={() => {}}>
                    right
                  </button>
                </div>
                <div className={styles.content__row}>
                  <button
                    className={styles.content__row_left}
                    onClick={() => {}}>
                    left
                  </button>
                  <button
                    className={styles.content__row_right}
                    onClick={() => {}}>
                    right
                  </button>
                </div>

                <div style={{ position: 'absolute' }}>
                  <SpoolButton onClick={() => send('macro:26')} />
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
              </>
            )}
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
