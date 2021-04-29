import { useState } from 'react'
import { BlockButton } from '../../components/buttons/BlockButton'

import styles from './Vehicle.module.css'

const VEHICLE_TABS = Object.freeze({
  SYSTEMS: 'systems',
  FUNCTIONS: 'functions',
})

export const VehicleTab = () => {
  const [tab, setTab] = useState(VEHICLE_TABS.SYSTEMS)

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
      <div>Vehicle</div>
    </>
  )
}
