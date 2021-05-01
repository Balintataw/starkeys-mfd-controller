import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../../components/buttons/BlockButton'
import { PowerBlock } from '../../components/powerBlock/PowerBlock'

import { ReactComponent as ArrowCircleRight } from '../../assets/arrow-circle-right.svg'
import { ReactComponent as ArrowCircleLeft } from '../../assets/arrow-circle-left.svg'
import { ReactComponent as ResetIcon } from '../../assets/reset.svg'

import { conn } from '../../client2server'
import { store } from '../../store'
import * as Graph from '../../Graph'

import styles from './Combat.module.css'
import { ShieldGrid } from './tabs/ShieldGrid'
import { throttle } from '../../helpers'

const COMBAT_TABS = Object.freeze({
  POWER: 'power',
  TARGETING: 'targeting',
  SHIELDS: 'shields',
})

export const CombatTab = () => {
  const { state } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 460 })

  const polyRef = useRef(null)
  const handleRef = useRef(null)

  const [tab, setTab] = useState(COMBAT_TABS.POWER)

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  const throttledSend = throttle(send, 300)

  const fontSize = isMobileDevice ? '16px' : '18px'

  function resetPowerDistribution() {
    // eslint-disable-next-line no-undef
    $('.map-selector').css({
      left: 175,
      top: 115,
    })
    send('macro:7')
  }

  useLayoutEffect(() => {
    const points = polyRef?.current
      ?.getAttribute('points')
      .trim()
      .split(' ')
      .map((vertex) => {
        const coordinates = vertex.split(',')
        return new Graph.aw.Graph.Point(
          Number(coordinates[0]),
          Number(-coordinates[1]),
        )
      })
    if (points) {
      const triangle = new Graph.aw.Graph.Polygon(points)
      // eslint-disable-next-line no-undef
      $('.map-selector').draggable({
        containment: '.map',
        drag(event, ui) {
          const { left } = ui.position
          const top = -ui.position.top
          if (top < -115) {
            // power to weapons
            throttledSend('macro:6')
          }
          if (top > -115 && left < 175) {
            // power to engines
            throttledSend('macro:4')
          }
          if (top > -115 && left > 175) {
            // power to shields
            throttledSend('macro:5')
          }
          const constrained = triangle.constrain(
            new Graph.aw.Graph.Point(left, top),
          )
          ui.position.left = constrained.x
          ui.position.top = -constrained.y
        },
      })
    }
  }, [tab])

  // Returns true if point P inside the triangle with vertices at A, B and C
  // representing 2D vectors and points as [x,y]. Based on
  // http://www.blackpawn.com/texts/pointinpoly/default.html
  // function pointInTriangle(P, A, B, C) {
  //   // Compute vectors
  //   function vec(from, to) {  return [to[0] - from[0], to[1] - from[1]];  }
  //   var v0 = vec(A, C);
  //   var v1 = vec(A, B);
  //   var v2 = vec(A, P);
  //   // Compute dot products
  //   function dot(u, v) {  return u[0] * v[0] + u[1] * v[1];  }
  //   var dot00 = dot(v0, v0);
  //   var dot01 = dot(v0, v1);
  //   var dot02 = dot(v0, v2);
  //   var dot11 = dot(v1, v1);
  //   var dot12 = dot(v1, v2);
  //   // Compute barycentric coordinates
  //   var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
  //   var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  //   var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
  //   // Check if point is in triangle
  //   return (u >= 0) && (v >= 0) && (u + v < 1);
  // }

  return (
    <>
      <div className={styles.top_row}>
        <BlockButton
          selected={tab === COMBAT_TABS.POWER}
          style={{ fontSize }}
          onClick={() => setTab(COMBAT_TABS.POWER)}>
          {isMobileDevice ? 'SYSTEMS' : 'POWER'}
        </BlockButton>
        <BlockButton
          style={{ margin: '0 12px', fontSize }}
          selected={tab === COMBAT_TABS.TARGETING}
          onClick={() => setTab(COMBAT_TABS.TARGETING)}>
          TARGETING
        </BlockButton>
        {isMobileDevice && (
          <BlockButton
            selected={tab === COMBAT_TABS.SHIELDS}
            style={{ fontSize }}
            onClick={() => setTab(COMBAT_TABS.SHIELDS)}>
            SHIELDS
          </BlockButton>
        )}
      </div>

      {tab === COMBAT_TABS.POWER && (
        <>
          <div
            className={styles.row}
            style={{ width: '100%', justifyContent: 'space-around' }}>
            <div className={styles.content__row_container}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <span>ENGINES</span>
                <span>SHIELDS</span>
              </div>
              <div
                className="map"
                style={{
                  width: '350px',
                  height: '300px',
                  position: 'relative',
                }}>
                <ResetIcon
                  className={styles.reset_icon}
                  onClick={resetPowerDistribution}>
                  RESET
                </ResetIcon>
                <svg height="100%" width="100%">
                  <polygon
                    ref={polyRef}
                    points="0,0 350,0 175,300"
                    style={{ fill: 'var(--primary20)' }}
                  />
                </svg>
                <div
                  ref={handleRef}
                  className="map-selector"
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    border: '4px solid var(--danger)',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '115px',
                    left: '175px',
                    marginTop: '-8px',
                    marginLeft: '-8px',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <span>WEAPONS</span>
              </div>
            </div>
            {!isMobileDevice && <ShieldGrid send={send} />}
          </div>

          <PowerBlock />
        </>
      )}

      {tab === COMBAT_TABS.TARGETING && (
        <>
          <div className={styles.content__rows_container}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ textAlign: 'center' }}>JUMP TO PIN</span>
                <div style={{ display: 'flex' }}>
                  <BlockButton
                    onClick={() => send('macro:51')}
                    style={{ minWidth: '45px' }}>
                    1
                  </BlockButton>
                  <BlockButton
                    onClick={() => send('macro:52')}
                    style={{ minWidth: '45px', margin: '0 8px' }}>
                    2
                  </BlockButton>
                  <BlockButton
                    onClick={() => send('macro:53')}
                    style={{ minWidth: '45px' }}>
                    3
                  </BlockButton>
                </div>
              </div>
              <BlockButton
                onClick={() => send('macro:57')}
                style={{ minWidth: '45px', maxWidth: '150px' }}>
                CLEAR PINS
              </BlockButton>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ textAlign: 'center' }}>SET PIN</span>
                <div style={{ display: 'flex' }}>
                  <BlockButton
                    onClick={() => send('macro:54')}
                    style={{ minWidth: '45px' }}>
                    1
                  </BlockButton>
                  <BlockButton
                    onClick={() => send('macro:55')}
                    style={{ minWidth: '45px', margin: '0 8px' }}>
                    2
                  </BlockButton>
                  <BlockButton
                    onClick={() => send('macro:56')}
                    style={{ minWidth: '45px' }}>
                    3
                  </BlockButton>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <BlockButton
                onClick={() => send('macro:78')}
                style={{ minWidth: '25%' }}>
                <ArrowCircleLeft style={{ marginRight: '12px' }} />
                ATTACKERS
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro:61')}
                style={{ minWidth: '25%' }}>
                ATTACKERS
                <ArrowCircleRight style={{ marginLeft: '12px' }} />
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                onClick={() => send('macro:77')}
                style={{ minWidth: '25%' }}>
                <ArrowCircleLeft style={{ marginRight: '12px' }} />
                HOSTILES
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro:63')}
                style={{ minWidth: '25%' }}>
                HOSTILES
                <ArrowCircleRight style={{ marginLeft: '12px' }} />
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                onClick={() => send('macro:80')}
                style={{ minWidth: '25%' }}>
                <ArrowCircleLeft style={{ marginRight: '12px' }} />
                SUB TARGETS
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro:69')}
                style={{ minWidth: '25%' }}>
                SUB TARGETS
                <ArrowCircleRight style={{ marginLeft: '12px' }} />
              </BlockButton>
            </div>
            <div className={styles.row}>
              <BlockButton
                onClick={() => send('macro:79')}
                style={{ minWidth: '25%' }}>
                <ArrowCircleLeft style={{ marginRight: '12px' }} />
                FRIENDLIES
              </BlockButton>
              <div className={styles.h_spacer} />
              <BlockButton
                onClick={() => send('macro:65')}
                style={{ minWidth: '25%' }}>
                FRIENDLIES
                <ArrowCircleRight style={{ marginLeft: '12px' }} />
              </BlockButton>
            </div>
          </div>

          <PowerBlock />
        </>
      )}

      {tab === COMBAT_TABS.SHIELDS && (
        <>
          <div className={`${styles.content__rows_container}`}>
            <ShieldGrid send={send} />
          </div>
          {/* <div
            className={`${styles.content__rows_container} map`}
            style={{
              width: '300px',
              height: '300px',
              position: 'relative',
            }}>
            <svg height="100%" width="100%">
              <polygon
                ref={polyRef}
                points="0,300 300,300 300,0 0,0"
                style={{ fill: 'var(--primary20)' }}
              />
            </svg>
            <div
              ref={handleRef}
              className="map-selector"
              style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                border: '1px solid var(--danger)',
                position: 'absolute',
                top: '148px',
                left: '150px',
                marginTop: '-8px',
                marginLeft: '-8px',
              }}
            />
          </div> */}

          <PowerBlock />
        </>
      )}
    </>
  )
}
