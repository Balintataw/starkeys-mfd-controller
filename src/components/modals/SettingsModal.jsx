/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useContext } from 'react'

import { store, types } from '../../store'
import { THEMES } from '../../themes'
import { setCSSVariables, useLocalStorage } from '../../helpers'

import styles from './SettingsModal.module.css'

export const SettingsModal = () => {
  const { state, dispatch } = useContext(store)
  const [hostIp, setHostIp] = useState(state.hostip)
  const [fileId, setFileId] = useState(state.fileid)
  const [_, setTheme] = useLocalStorage('theme', state.theme)

  function handleConnect() {
    dispatch({ type: types.setHostIP, payload: hostIp })
    dispatch({ type: types.setFileId, payload: fileId })
    dispatch({ type: types.setServerCheck, payload: true })
    window.location.replace(
      `${window.location.href.split('?')[0]}?hostip=${hostIp}&fileid=${fileId}`,
    )
  }

  function handleThemeSelect(t) {
    // dispatch({ type: types.setTheme, payload: THEMES[t] })
    setTheme(THEMES[t])
    setCSSVariables(THEMES[t])
  }

  function closeModal() {
    dispatch({ type: types.settingsModal, payload: false })
  }

  return (
    <div className={styles.modal_bg}>
      <div className={styles.modal_card}>
        <button className={styles.close_button} onClick={closeModal}>
          CLOSE
        </button>
        <span className={styles.label}>Themes:</span>
        <div className={styles.themes_wrapper}>
          {Object.keys(THEMES).map((t) => (
            <button
              key={t}
              className={styles.theme_button}
              onClick={() => handleThemeSelect(t)}>
              {t}
            </button>
          ))}
        </div>
        <label htmlFor="hostip" className={styles.label}>
          Host IP:
        </label>
        <input
          id="hostip"
          type="text"
          name="hostip"
          onChange={(e) => setHostIp(e.target.value)}
          value={hostIp}
          className={styles.input}
        />
        <label htmlFor="fileid" className={styles.label}>
          File ID:
        </label>
        <input
          id="fileid"
          type="text"
          name="fileid"
          onChange={(e) => setFileId(e.target.value)}
          value={fileId}
          className={styles.input}
        />
        <button className={styles.button} onClick={handleConnect}>
          CONNECT
        </button>
      </div>
    </div>
  )
}
