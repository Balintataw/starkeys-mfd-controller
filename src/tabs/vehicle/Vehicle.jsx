import { useContext, useState } from 'react'

import { BlockButton } from '../../components/buttons/BlockButton'
import { RoundButton } from '../../components/buttons/RoundButton'

import { conn } from '../../client2server'
import { store } from '../../store'

import styles from './Vehicle.module.css'
import { PowerBlock } from '../../components/powerBlock/PowerBlock'

const VEHICLE_TABS = Object.freeze({
  SYSTEMS: 'systems',
  FUNCTIONS: 'functions',
})

export const VehicleTab = () => {
  const { state } = useContext(store)

  const [tab, setTab] = useState(VEHICLE_TABS.SYSTEMS)

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  return (
    <>
      <div className={styles.top_row}>
        <BlockButton
          style={{ marginRight: '12px' }}
          selected={tab === VEHICLE_TABS.SYSTEMS}
          onClick={() => setTab(VEHICLE_TABS.SYSTEMS)}>
          POWER
        </BlockButton>
        <BlockButton
          selected={tab === VEHICLE_TABS.FUNCTIONS}
          onClick={() => setTab(VEHICLE_TABS.FUNCTIONS)}>
          SCANNING
        </BlockButton>
      </div>
      <div className={styles.content__rows_container}>
        <RoundButton text="HORN" onClick={() => send('macro:83')} />
      </div>
      <div className={styles.row}>
        <BlockButton
          style={{ marginRight: '12px' }}
          onClick={() => send('macro:84')}>
          LIGHTS
        </BlockButton>
        <BlockButton onClick={() => send('macro:12')}>EXIT SEAT</BlockButton>
      </div>

      <PowerBlock />
    </>
  )
}
