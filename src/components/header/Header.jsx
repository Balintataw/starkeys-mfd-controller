import React, { useContext } from 'react'

import { MobiButton } from '../mobiButton/MobiButton'

import Logo from '../../assets/logo.svg'

import { store, types } from '../../store'
import { conn } from '../../client2server'

import styles from './Header.module.css'
import { BlockButton } from '../buttons/BlockButton'

export const Header = ({ onTabSelect }) => {
  const { state, dispatch } = useContext(store)

  function handleClick(t) {
    onTabSelect(t)
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__quadrant}>left</div>
        <div className={styles.header__quadrant}>
          <img src={Logo} alt="logo" style={{ height: '32px', width: '32px' }} />
          <img src={Logo} alt="logo" style={{ height: '32px', width: '32px' }} />
          <img src={Logo} alt="logo" style={{ height: '32px', width: '32px' }} />
        </div>
      </div>
      {/* <div className={styles.header__center}>
        <MobiButton onClick={handleMobiButton} />
      </div> */}
      <div className={styles.header__bottom}>
        <div className={styles.header__quadrant}>
          <BlockButton onClick={() => handleClick(0)}>FLIGHT</BlockButton>
        </div>
        <div className={styles.header__quadrant}>
          <BlockButton onClick={() => handleClick(1)}>SYSTEMS</BlockButton>
        </div>
      </div>
    </header>
  )
}