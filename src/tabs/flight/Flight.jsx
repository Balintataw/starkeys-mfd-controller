import { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../../components/buttons/BlockButton'
import { SpoolButton } from '../../components/buttons/SpoolButton'

import { conn } from '../../client2server'
import { store } from '../../store'

import styles from './Flight.module.css'

const FLIGHT_TABS = Object.freeze({
  'SYSTEMS': 'systems',
  'QUANTUM': 'quantum',
  'FUNCTIONS': 'functions'
})

export const FlightTab = () => {
  const { state, dispatch } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 440 })

  const [tab, setTab] = useState(0)

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  return (
    <>
      <div className={styles.top_row}>
        <BlockButton selected={tab === FLIGHT_TABS.SYSTEMS} onClick={() => setTab(FLIGHT_TABS.SYSTEMS)}>SYSTEMS</BlockButton>
        <BlockButton style={{ margin: '0 12px' }} selected={tab === FLIGHT_TABS.QUANTUM} onClick={() => setTab(FLIGHT_TABS.QUANTUM)}>QUANTUM</BlockButton>
        <BlockButton selected={tab === FLIGHT_TABS.FUNCTIONS} onClick={() => setTab(FLIGHT_TABS.FUNCTIONS)}>FUNCTIONS</BlockButton>
      </div>

      {tab === FLIGHT_TABS.SYSTEMS && (
        <>
          <div className={styles.content__rows_container}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>FLIGHT READY</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>LANDING GEAR</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')}>AUTO LAND</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>ENGAGE QUANTUM</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>INITIATE SPOOL</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')}>SCANNING</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>LIGHTS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')}>EXIT SEAT</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>OPEN DOORS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>CLOSE DOORS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>LOCK</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>UNLOCK</BlockButton>
            </div>
          </div>
          <div className={styles.bottom_row}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>POWER</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>SHIELDS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>ENGINES</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>WEAPONS</BlockButton>
            </div>
          </div>
        </>
      )}

      {tab === FLIGHT_TABS.QUANTUM && (
        <>
          <div className={styles.content__rows_container}>
            {isMobileDevice ? (
              <div style={{ position: 'relative' }}>
                <SpoolButton onClick={() => send('macro26')}/>
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  height: '80px',
                  width: '100%',
                  backgroundColor: 'var(--black80)',
                  zIndex: 20,
                }}>
                  <BlockButton style={{ height: '100%' }} onClick={() => send('macro25')}>INITIATE SPOOL</BlockButton>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.content__row}>
                  <div className={styles.content__row_left} onClick={() => send('macro10')}>FLIGHT READY</div>
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
              </>
            )}
          </div>

          <div className={styles.bottom_row}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>POWER</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>SHIELDS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>ENGINES</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>WEAPONS</BlockButton>
            </div>
          </div>
        </>
      )}

      {tab === FLIGHT_TABS.FUNCTIONS && (
        <>
          <div className={styles.content__rows_container}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>CYCLE CAMERA</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')}>VTOL</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>LIMITER TOGGLE</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')}>CRUISE CONTROL</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>SELF DESTRUCT</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>EJECT</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>GIMBAL MODE</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>DECOUPLE</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>GSAFE</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>ESP</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>WEAPONS</BlockButton>
            </div>
          </div>
          <div className={styles.bottom_row}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>POWER</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>SHIELDS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>ENGINES</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>WEAPONS</BlockButton>
            </div>
          </div>
        </>
      )}
    </>
  )
}