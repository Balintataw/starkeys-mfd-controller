import { useContext } from 'react'

import { MobiButton } from '../mobiButton/MobiButton'

import { conn } from '../../client2server'
import { store } from '../../store'

import styles from './Footer.module.css'

export const Footer = () => {
  const { state } = useContext(store)

  function handleMobiButton() {
    conn(state.hostip, state.fileid, 'macro:1')
  }

  return (
    <footer className={styles.footer}>
      <MobiButton onClick={handleMobiButton} />
    </footer>
  )
}