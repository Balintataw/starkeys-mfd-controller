import { useState, useContext } from 'react'

import { store, types } from '../../store'

import styles from './ConnectionModal.module.css'

export const ConnectionModal = () => {
  const { state, dispatch } = useContext(store)

  const [hostIp, setHostIp] = useState(state.hostip)
  const [fileId, setFileId] = useState(state.fileid)

  function handleConnect() {
    dispatch({ type: types.setHostIP, payload: hostIp })
    dispatch({ type: types.setFileId, payload: fileId })
    dispatch({ type: types.setServerCheck, payload: true })
    window.location.replace(`${window.location.href.split('?')[0]}?hostip=${hostIp}&fileid=${fileId}`)
  }

  return (
    <div className={styles.modal_bg}>
      <div className={styles.modal_card}>
        <label className={styles.label}>Host IP: </label>
        <input
          id="hostip"
          type="text"
          name="hostip"
          onChange={e => setHostIp(e.target.value)}
          value={hostIp}
          className={styles.input}
        />
        <label className={styles.label}>File ID: </label>
        <input
          id="fileid"
          type="text"
          name="fileid"
          onChange={e => setFileId(e.target.value)}
          value={fileId}
          className={styles.input}
        />
        <button className={styles.button} onClick={handleConnect}>CONNECT</button>
      </div>
    </div>
  )
}