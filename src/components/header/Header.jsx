import React, { useContext, useState } from 'react'

import { MobiButton } from '../mobiButton/MobiButton'

import Logo from '../../assets/logo.svg'

import { store, types } from '../../store'
import { conn } from '../../client2server'

import styles from './Header.module.css'
import { BlockButton } from '../buttons/BlockButton'

export const HEADER_TABS = Object.freeze({
  'MINING': 'mining',
  'FLIGHT': 'flight',
  'VEHICLE': 'vehicle',
  'COMBAT': 'combat',
})

export const Header = ({ onTabSelect, currentTab }) => {

  function handleClick(t) {
    onTabSelect(t)
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__quadrant}>
          <BlockButton selected={currentTab === HEADER_TABS.MINING} onClick={() => handleClick(HEADER_TABS.MINING)}>MINING</BlockButton>
        </div>
        <div className={styles.header__quadrant}>
          <BlockButton selected={currentTab === HEADER_TABS.VEHICLE} onClick={() => handleClick(HEADER_TABS.VEHICLE)}>VEHICLE</BlockButton>
        </div>
      </div>
      {/* <div className={styles.header__center}>
        <MobiButton onClick={handleMobiButton} />
      </div> */}
      <div className={styles.header__bottom}>
        <div className={styles.header__quadrant}>
          <BlockButton selected={currentTab === HEADER_TABS.FLIGHT} onClick={() => handleClick(HEADER_TABS.FLIGHT)}>FLIGHT</BlockButton>
        </div>
        <div className={styles.header__quadrant}>
          <BlockButton selected={currentTab === HEADER_TABS.COMBAT} onClick={() => handleClick(HEADER_TABS.COMBAT)}>COMBAT</BlockButton>
        </div>
      </div>
    </header>
  )
}