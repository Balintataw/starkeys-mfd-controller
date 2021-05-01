import { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

import { PowerBlock } from '../../components/powerBlock/PowerBlock'

import { conn } from '../../client2server'
import { store } from '../../store'

import { MiningMobile } from './tabs/Mining--Mobile'
import { MiningDesktop } from './tabs/Mining--Desktop'

import styles from './Mining.module.css'

export const MiningTab = () => {
  const { state } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  return (
    <>
      {isMobileDevice ? (
        <MiningMobile send={send} />
      ) : (
        <MiningDesktop send={send} />
      )}

      <PowerBlock />
    </>
  )
}
