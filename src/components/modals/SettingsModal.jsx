/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useContext } from 'react'

import { store, types } from '../../store'
import { THEMES } from '../../themes'
import { setCSSVariables } from '../../helpers'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import { ReactComponent as Fullscreen } from '../../assets/fullscreen.svg'
import { ReactComponent as FullscreenExit } from '../../assets/fullscreen-exit.svg'
import { ReactComponent as Close } from '../../assets/close.svg'

import styles from './SettingsModal.module.css'

export const SettingsModal = ({ isFullscreen, toggleFullscreen }) => {
  const { state, dispatch } = useContext(store)

  const [_, setTheme] = useLocalStorage('theme', state.theme)

  const [hostIp, setHostIp] = useState(state.hostip)
  const [fileId, setFileId] = useState(state.fileid)

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
        <div className={styles.modal_card__header}>
          {isFullscreen ? (
            <FullscreenExit
              className={styles.modal_card__header_button}
              onClick={toggleFullscreen}
            />
          ) : (
            <Fullscreen
              className={styles.modal_card__header_button}
              onClick={toggleFullscreen}
            />
          )}
          <Close
            className={styles.modal_card__header_button}
            onClick={closeModal}
          />
        </div>
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
