import { ReactComponent as ShieldFront } from '../../../assets/shields-top.svg'
import { ReactComponent as ShieldDecoy } from '../../../assets/shields-decoy.svg'
import { ReactComponent as ShieldRight } from '../../../assets/shields-right.svg'
import { ReactComponent as ShieldNoise } from '../../../assets/shields-noise.svg'
import { ReactComponent as ShieldRear } from '../../../assets/shields-bottom.svg'
import { ReactComponent as ShieldLeft } from '../../../assets/shields-left.svg'
import { ReactComponent as ShieldCenter } from '../../../assets/shields-center.svg'
import { ReactComponent as ShieldUpper } from '../../../assets/shields-upper.svg'
import { ReactComponent as ShieldLower } from '../../../assets/shields-lower.svg'

import styles from './ShieldGrid.module.css'

export const ShieldGrid = ({ send }) => (
  <div className={styles.shield_grid}>
    <ShieldNoise
      className={styles.shield_grid__item}
      onClick={() => send('macro:19')}
    />
    <ShieldFront
      className={styles.shield_grid__item}
      onClick={() => send('macro:35')}
    />
    <ShieldUpper
      className={styles.shield_grid__item}
      onClick={() => send('macro:34')}
    />
    <ShieldLeft
      className={styles.shield_grid__item}
      onClick={() => send('macro:31')}
    />
    <ShieldCenter
      className={styles.shield_grid__item}
      onClick={() => send('macro:32')}
    />
    <ShieldRight
      className={styles.shield_grid__item}
      onClick={() => send('macro:33')}
    />
    <ShieldDecoy
      className={styles.shield_grid__item}
      onClick={() => send('macro:18')}
    />
    <ShieldRear
      className={styles.shield_grid__item}
      onClick={() => send('macro:30')}
    />
    <ShieldLower
      className={styles.shield_grid__item}
      onClick={() => send('macro:36')}
    />
  </div>
)
