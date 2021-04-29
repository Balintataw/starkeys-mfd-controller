import { useContext, useEffect, useState } from 'react'

import { ConnectionModal } from '../components/modals/ConnectionModal'
import { Header, HEADER_TABS } from '../components/header/Header'
import { SettingsModal } from '../components/modals/SettingsModal'
import { Footer } from '../components/footer/Footer'

import { FlightTab } from '../tabs/flight/Flight'
import { MiningTab } from '../tabs/mining/Mining'
import { CombatTab } from '../tabs/combat/Combat'


import { store, types } from '../store'
import { setCSSVariables } from '../helpers'

import styles from './Home.module.css'

export const Home = () => {
  const { state, dispatch } = useContext(store)

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

  return (
    <div className={styles.home}>
      <Header
        serverCheck={state.serverCheck}
        onTabSelect={onTabSelect}
        currentTab={tab}
      />

      <div className={styles.content}>
        {tab === HEADER_TABS.FLIGHT && <FlightTab />}
        {tab === HEADER_TABS.MINING && <MiningTab />}
        {tab === HEADER_TABS.COMBAT && <CombatTab />}
      </div>

      <Footer />

      {!state.serverCheck && <ConnectionModal />}

      {state.settingsModalVisible && <SettingsModal />}
    </div>
  )
}
