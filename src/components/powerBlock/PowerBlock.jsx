import { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../buttons/BlockButton'

import { conn } from '../../client2server'
import { store } from '../../store'

import styles from './PowerBlock.module.css'

export const PowerBlock = () => {
  const { state } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  const fontSize = isMobileDevice ? '14px' : '18px'

  return (
    <div className={styles.bottom_row}>
      <div className={styles.row}>
        <BlockButton
          onClick={() => send('macro:14')}
          style={{ fontSize, minWidth: '70px' }}>
          POWER
        </BlockButton>
        <div className={styles.h_spacer} />
        <BlockButton
          onClick={() => send('macro:15')}
          style={{ fontSize, minWidth: '70px' }}>
          ENGINES
        </BlockButton>
        <div className={styles.h_spacer} />
        <BlockButton
          onClick={() => send('macro:16')}
          style={{ fontSize, minWidth: '70px' }}>
          SHIELDS
        </BlockButton>
        <div className={styles.h_spacer} />
        <BlockButton
          onClick={() => send('macro:17')}
          style={{ fontSize, minWidth: '70px' }}>
          WEAPONS
        </BlockButton>
      </div>
    </div>
  )
}
