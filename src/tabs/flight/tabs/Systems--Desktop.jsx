import { useState } from 'react'
import { BlockButton } from '../../../components/buttons/BlockButton'
import { RoundButton } from '../../../components/buttons/RoundButton'

import { ReactComponent as Lock } from '../../../assets/lock.svg'
import { ReactComponent as Unlock } from '../../../assets/unlock.svg'

import styles from './Systems--Desktop.module.css'

export const SystemsDesktop = ({ send }) => {
  const [selfDestructDisabled, setSelfDestructDisabled] = useState(true)
  const [ejectDisabled, setEjectDisabled] = useState(true)

  return (
    <>
      <div className={styles.content__row}>
        <button
          className={styles.content__row_left}
          onClick={() => send('macro:10')}>
          FLIGHT READY
        </button>
        <button
          className={styles.content__row_right}
          onClick={() => send('macro:27')}>
          LANDING GEAR
        </button>
      </div>
      <div className={styles.content__row}>
        <button
          className={styles.content__row_left}
          onClick={() => send('macro:9')}>
          SCANNING MODE
        </button>
        <button
          className={styles.content__row_right}
          onClick={() => send('macro:28')}>
          AUTO LAND / AUTO DOCK
        </button>
      </div>
      <div className={styles.content__row}>
        <button
          className={styles.content__row_left}
          onClick={() => send('macro:82')}>
          HAIL TARGET
        </button>
        <button
          className={styles.content__row_right}
          onClick={() => send('macro:24')}>
          DECOUPLE
        </button>
      </div>

      <div style={{ position: 'absolute' }}>
        <RoundButton text="ENGAGE QUANTUM" onClick={() => send('macro:26')} />
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
      <div className={styles.content__row_between}>
        <BlockButton
          style={{ position: 'relative' }}
          danger
          disabled={selfDestructDisabled}
          onClick={() => send('macro:38')}>
          {selfDestructDisabled ? (
            <Lock
              onClick={() => setSelfDestructDisabled(false)}
              style={{
                color: 'var(--black80)',
                height: '26px',
                width: '26px',
                border: '1px solid var(--primary)',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                padding: '8px',
                position: 'absolute',
                left: '-10px',
                zIndex: 10,
              }}
            />
          ) : (
            <Unlock
              onClick={() => setSelfDestructDisabled(true)}
              style={{
                color: 'var(--black80)',
                height: '26px',
                width: '26px',
                border: '1px solid var(--primary)',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                padding: '8px',
                position: 'absolute',
                left: '-10px',
                zIndex: 10,
              }}
            />
          )}
          SELF DESTRUCT
        </BlockButton>
        <BlockButton
          danger
          disabled={ejectDisabled}
          onClick={() => send('macro:13')}>
          {ejectDisabled ? (
            <Lock
              onClick={() => setEjectDisabled(false)}
              style={{
                color: 'var(--black80)',
                height: '26px',
                width: '26px',
                border: '1px solid var(--primary)',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                padding: '8px',
                position: 'absolute',
                right: '-10px',
                zIndex: 10,
              }}
            />
          ) : (
            <Unlock
              onClick={() => setEjectDisabled(true)}
              style={{
                color: 'var(--black80)',
                height: '26px',
                width: '26px',
                border: '1px solid var(--primary)',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                padding: '8px',
                position: 'absolute',
                right: '-10px',
                zIndex: 10,
              }}
            />
          )}
          EJECT
        </BlockButton>
      </div>
    </>
  )
}
