/* eslint-disable */
import React from 'react'

const getBrowserFullscreenElementProp = () => {
  if (typeof document.fullscreenElement !== undefined) {
    return 'fullscreenElement'
  } else if (typeof document.mozFullscreenElement !== undefined) {
    return 'mozFullscreenElement'
  } else if (typeof document.msFullscreenElement !== undefined) {
    return 'msFullscreenElement'
  } else if (typeof document.webkitFullscreenElement !== undefined) {
    return 'webkitFullscreenElement'
  } else {
    throw new Error('Fullscreen is not supported by this browser')
  }
}

export const useFullScreen = (elRef) => {
  const [isFullscreen, setIsFullscreen] = React.useState(
    document[getBrowserFullscreenElementProp()] != null,
  )

  const setFullscreen = () => {
    const el = elRef.current
    if (el == null) return
    if (el.requestFullscreen) {
      el.requestFullscreen()
        .then(() => {
          console.log(getBrowserFullscreenElementProp())
          setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
        })
        .catch(() => setIsFullscreen(false))
    } else if (el.webkitRequestFullScreen) {
      el.webkitRequestFullScreen()
        .then(() => {
          console.log(getBrowserFullscreenElementProp())
          setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
        })
        .catch(() => setIsFullscreen(false))
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
        .then(() => {
          console.log(getBrowserFullscreenElementProp())
          setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
        })
        .catch(() => setIsFullscreen(false))
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
        .then(() => {
          console.log(getBrowserFullscreenElementProp())
          setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
        })
        .catch(() => setIsFullscreen(false))
    } else if (el.webkitEnterFullscreen) {
      el.webkitEnterFullscreen() //for iphone this code worked
        .then(() => {
          console.log(getBrowserFullscreenElementProp())
          setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
        })
        .catch(() => setIsFullscreen(false))
    }
  }

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
    return () => (document.onfullscreenchange = undefined)
  })

  return [isFullscreen, setFullscreen]
}
