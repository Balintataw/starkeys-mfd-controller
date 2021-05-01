import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../../../components/buttons/BlockButton'
import { RoundButton } from '../../../components/buttons/RoundButton'
import { UtilityBlock } from '../../../components/utilityBlock/UtilityBlock'

import styles from './Mining--Desktop.module.css'

export const MiningDesktop = ({ send }) => {
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  const fontSize = isMobileDevice ? '14px' : '18px'

  return (
    <>
      <UtilityBlock />
      <div className={styles.content__rows_container}>
        <div className={styles.content__left_col}>
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
            }}
            className={styles.row}>
            <BlockButton
              style={{ width: '50px' }}
              onClick={() => send('macro:89')}>
              TOGGLE LASER MODE
            </BlockButton>
            <BlockButton
              style={{ width: '50px' }}
              onClick={() => send('macro:90')}>
              TOGGLE LASER GIMBAL
            </BlockButton>
          </div>
          <RoundButton
            text="ACTIVATE LASER"
            style={{ height: '200px', width: '200px', fontSize: '28px' }}
          />
          <div className={styles.row} style={{ marginTop: '12px' }}>
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
            <BlockButton style={{ fontSize }} onClick={() => send('macro:93')}>
              CONSUMABLE 3
            </BlockButton>
          </div>
          <div className={styles.row}>
            <BlockButton danger onClick={() => send('macro:94')}>
              JETTISON CARGO
            </BlockButton>
          </div>
        </div>
        <div className={styles.content__right_col}>
          <div className={styles.row}>
            <BlockButton
              style={{ height: '80px', marginRight: '12px' }}
              onClick={() => send('macro:9')}>
              SCAN MODE
            </BlockButton>
            <BlockButton
              style={{ height: '80px' }}
              onClick={() => send('macro:29')}>
              MINE MODE
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
      </div>
    </>
  )
}
