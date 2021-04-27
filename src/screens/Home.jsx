import React, { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { ConnectionModal } from '../components/modals/ConnectionModal'
import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'

import { FlightTab } from '../tabs/flight/Flight'
import { MiningTab } from '../tabs/mining/Mining'

import { conn } from '../client2server'
import { store, types } from '../store'

import styles from './Home.module.css'

export const Home = () => {
  const { state, dispatch } = useContext(store)

  const [tab, setTab] = useState(0)

  const WindowLocationSearch = window.location.search

  useEffect(() => {
    const findGetParameter = () => {
      // params are hostip and fileid
      let tmp = [];
      WindowLocationSearch
        .substr(1)
        .split("&")
        .forEach(item => {
          tmp = item.split("=");
          if (tmp[0] === 'hostip') {
            dispatch({ type: types.setHostIP, payload: decodeURIComponent(tmp[1]) })
          } else if (tmp[0] === 'fileid') {
            dispatch({ type: types.setFileId, payload: decodeURIComponent(tmp[1]) })
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

      <Header serverCheck={state.serverCheck} onTabSelect={onTabSelect}></Header>

      <div className={styles.content}>
        {tab === 0 && <FlightTab />}
        {tab === 3 && <MiningTab />}
      </div>

      <Footer />

      {!state.serverCheck && <ConnectionModal />}

    </div>
  )
}