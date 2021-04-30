import { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../buttons/BlockButton'

import { conn } from '../../client2server'
import { store } from '../../store'

import styles from './UtilityBlock.module.css'

export const UtilityBlock = () => {
  const { state } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  const fontSize = isMobileDevice ? '14px' : '18px'

  return (
    <div className={styles.top_row}>
      <div className={styles.row}>
        <BlockButton
          onClick={() => send('macro:20')}
          style={{ fontSize, minWidth: '80px' }}>
          VTOL
        </BlockButton>
        <div className={styles.h_spacer} />
        <BlockButton
          onClick={() => send('macro:73')}
          style={{ fontSize, minWidth: '80px' }}>
          HELMET
        </BlockButton>
        <div className={styles.h_spacer} />
        <BlockButton
          onClick={() => send('macro:23')}
          style={{ fontSize, minWidth: '80px' }}>
          CRUISE CONTROL
        </BlockButton>
        <div className={styles.h_spacer} />
        <BlockButton
          onClick={() => send('macro:40')}
          style={{ fontSize, minWidth: '80px' }}>
          GIMBAL MODE
        </BlockButton>
      </div>
    </div>
  )
}
