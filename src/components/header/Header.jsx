import { useContext } from 'react'

import { BlockButton } from '../buttons/BlockButton'

import { ReactComponent as SettingsIcon } from '../../assets/menu-icon.svg'

import { store, types } from '../../store'

import styles from './Header.module.css'

export const HEADER_TABS = Object.freeze({
  MINING: 'mining',
  FLIGHT: 'flight',
  VEHICLE: 'vehicle',
  COMBAT: 'combat',
})

export const Header = ({ onTabSelect, currentTab }) => {
  const { dispatch } = useContext(store)

  function handleClick(t) {
    onTabSelect(t)
  }

  function handleSettingsClick() {
    dispatch({ type: types.settingsModal, payload: true })
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__quadrant}>
          <BlockButton
            selected={currentTab === HEADER_TABS.MINING}
            style={{ padding: '8px' }}
            onClick={() => handleClick(HEADER_TABS.MINING)}>
            MINING
          </BlockButton>
        </div>
        <div className={styles.header__quadrant}>
          <BlockButton
            selected={currentTab === HEADER_TABS.VEHICLE}
            style={{ padding: '8px' }}
            onClick={() => handleClick(HEADER_TABS.VEHICLE)}>
            VEHICLE
          </BlockButton>
        </div>
      </div>
      <div className={styles.header__center}>
        <button
          onClick={handleSettingsClick}
          className={styles.header__settings_button}>
          <SettingsIcon className={styles.header__settings_icon} />
        </button>
      </div>
      <div className={styles.header__bottom}>
        <div className={styles.header__quadrant}>
          <BlockButton
            selected={currentTab === HEADER_TABS.FLIGHT}
            style={{ padding: '8px' }}
            onClick={() => handleClick(HEADER_TABS.FLIGHT)}>
            FLIGHT
          </BlockButton>
        </div>
        <div className={styles.header__quadrant}>
          <BlockButton
            selected={currentTab === HEADER_TABS.COMBAT}
            style={{ padding: '8px' }}
            onClick={() => handleClick(HEADER_TABS.COMBAT)}>
            COMBAT
          </BlockButton>
        </div>
      </div>
    </header>
  )
}
