import { useContext } from 'react'

import { conn } from '../../client2server'
import { store } from '../../store'

import { ReactComponent as Talk } from '../../assets/comms.svg'
import { ReactComponent as Mobi } from '../../assets/mobiglas.svg'
import { ReactComponent as StarMap } from '../../assets/starmap.svg'

import styles from './Footer.module.css'

export const Footer = () => {
  const { state } = useContext(store)

  function handleClick(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  return (
    <footer className={styles.footer}>
      <StarMap
        onClick={() => handleClick('macro:2')}
        style={{ textColor: 'var(--primary)', height: '60px', width: '60px' }}
      />
      <Mobi
        onClick={() => handleClick('macro:1')}
        style={{ textColor: 'var(--primary)', height: '60px', width: '60px' }}
      />
      <Talk
        onClick={() => handleClick('macro:8')}
        style={{ textColor: 'var(--primary)', height: '60px', width: '60px' }}
      />
    </footer>
  )
}
