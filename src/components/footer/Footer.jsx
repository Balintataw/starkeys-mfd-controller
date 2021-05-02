import { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

import { conn } from '../../client2server'
import { store } from '../../store'

import { ReactComponent as Talk } from '../../assets/comms.svg'
import { ReactComponent as Mobi } from '../../assets/mobiglas.svg'
import { ReactComponent as StarMap } from '../../assets/starmap.svg'

import styles from './Footer.module.css'

export const Footer = () => {
  const { state } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  function handleClick(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  const iconSize = isMobileDevice ? '40px' : '60px'
  const footerHeight = isMobileDevice ? '60px' : '100px'

  return (
    <footer className={styles.footer} style={{ height: footerHeight }}>
      <StarMap
        onClick={() => handleClick('macro:2')}
        style={{
          textColor: 'var(--primary)',
          height: iconSize,
          width: iconSize,
        }}
      />
      <Mobi
        onClick={() => handleClick('macro:1')}
        style={{
          textColor: 'var(--primary)',
          height: iconSize,
          width: iconSize,
        }}
      />
      <Talk
        onClick={() => handleClick('macro:8')}
        style={{
          textColor: 'var(--primary)',
          height: iconSize,
          width: iconSize,
        }}
      />
    </footer>
  )
}
