import { BlockButton } from '../../../components/buttons/BlockButton'

import styles from './Systems--Mobile.module.css'

export const SystemsMobile = ({ send }) => (
  <>
    <div className={styles.row}>
      <BlockButton style={{ height: '80px' }} onClick={() => send('macro:10')}>
        FLIGHT READY
      </BlockButton>
    </div>

    <div className={styles.row}>
      <BlockButton onClick={() => send('macro:27')}>LANDING GEAR</BlockButton>
      <div className={styles.h_spacer} />
      <BlockButton onClick={() => send('macro:28')}>AUTO LAND</BlockButton>
    </div>

    <div className={styles.row}>
      <BlockButton style={{ height: '80px' }} onClick={() => send('macro:26')}>
        ENGAGE QUANTUM
      </BlockButton>
    </div>

    <div className={styles.row}>
      <BlockButton onClick={() => send('macro:25')}>INITIATE SPOOL</BlockButton>
      <div className={styles.h_spacer} />
      <BlockButton onClick={() => send('macro:9')}>SCANNING</BlockButton>
    </div>

    <div className={styles.row}>
      <BlockButton onClick={() => send('macro:11')}>LIGHTS</BlockButton>
      <div className={styles.h_spacer} />
      <BlockButton onClick={() => send('macro:12')}>EXIT SEAT</BlockButton>
    </div>

    <div className={styles.row}>
      <BlockButton onClick={() => send('macro:21')}>
        DOORS OPEN/CLOSE
      </BlockButton>
      <div className={styles.h_spacer} />
      <BlockButton onClick={() => send('macro:22')}>
        DOORS LOCK/UNLOCK
      </BlockButton>
    </div>
  </>
)
