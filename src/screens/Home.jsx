import { useContext, useEffect, useRef, useState } from 'react'

import { ConnectionModal } from '../components/modals/ConnectionModal'
import { Header, HEADER_TABS } from '../components/header/Header'
import { SettingsModal } from '../components/modals/SettingsModal'
import { Footer } from '../components/footer/Footer'

import { FlightTab } from '../tabs/flight/Flight'
import { MiningTab } from '../tabs/mining/Mining'
import { CombatTab } from '../tabs/combat/Combat'
import { VehicleTab } from '../tabs/vehicle/Vehicle'

import { store, types } from '../store'
import { setCSSVariables } from '../helpers'

import styles from './Home.module.css'
import { useFullScreen } from '../hooks/useFullScreen'

export const Home = () => {
  const { state, dispatch } = useContext(store)

  const fullscreenContainer = useRef()

  const [isFullscreen, setFullscreen] = useFullScreen(fullscreenContainer)

  const [tab, setTab] = useState(HEADER_TABS.FLIGHT)

  const WindowLocationSearch = window.location.search

  useEffect(() => {
    setCSSVariables(state.theme)
  }, [state.theme])

  useEffect(() => {
    const findGetParameter = () => {
      // params are hostip and fileid
      let tmp = []
      WindowLocationSearch.substr(1)
        .split('&')
        .forEach((item) => {
          tmp = item.split('=')
          if (tmp[0] === 'hostip') {
            dispatch({
              type: types.setHostIP,
              payload: decodeURIComponent(tmp[1]),
            })
          } else if (tmp[0] === 'fileid') {
            dispatch({
              type: types.setFileId,
              payload: decodeURIComponent(tmp[1]),
            })
          } else {
            dispatch({ type: types.setServerCheck, payload: false })
          }
        })
    }
    findGetParameter()
  }, [WindowLocationSearch, dispatch])

  function onTabSelect(t) {
    setTab(t)
  }

  function toggleFullscreen() {
    return isFullscreen ? document.exitFullscreen() : setFullscreen(true)
  }

  return (
    <div ref={fullscreenContainer} className={styles.home}>
      <Header onTabSelect={onTabSelect} currentTab={tab} />

      <div className={styles.content}>
        {tab === HEADER_TABS.FLIGHT && <FlightTab />}
        {tab === HEADER_TABS.MINING && <MiningTab />}
        {tab === HEADER_TABS.COMBAT && <CombatTab />}
        {tab === HEADER_TABS.VEHICLE && <VehicleTab />}
      </div>

      <Footer />

      {!state.serverCheck && <ConnectionModal />}

      {state.settingsModalVisible && (
        <SettingsModal
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
      )}
    </div>
  )
}
