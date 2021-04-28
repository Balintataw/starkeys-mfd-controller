import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BlockButton } from '../../components/buttons/BlockButton'
import { SpoolButton } from '../../components/buttons/SpoolButton'

import { conn } from '../../client2server'
import { store } from '../../store'
import * as Graph from '../../Graph'

import styles from './Combat.module.css'

const COMBAT_TABS = Object.freeze({
  'POWER': 'power',
  'TARGETING': 'targeting',
  'SHIELDS': 'shields',
})

export const CombatTab = () => {
  const { state, dispatch } = useContext(store)
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 440 })

  const polyRef = useRef(null)
  const handleRef = useRef(null)

  const [tab, setTab] = useState(0)

  useLayoutEffect(() => {
    var points = polyRef?.current?.getAttribute('points').trim().split(' ').map((vertex) => {
      var coordinates = vertex.split(',');
      return new Graph.aw.Graph.Point(Number(coordinates[0]), Number(-coordinates[1]));
    });
    if (points) {
      //var triangle = new aw.Graph.Polygon([new aw.Graph.Point(10, -10), new aw.Graph.Point(246, -128), new aw.Graph.Point(40, -232)]);
      var triangle = new Graph.aw.Graph.Polygon(points);
      // eslint-disable-next-line no-undef
      $('.map-selector').draggable({
				containment: '.map',
				drag: function (event, ui) {
          console.log('UI', ui)
					var left = ui.position.left, top = -ui.position.top;
					var constrained = triangle.constrain(new Graph.aw.Graph.Point(left, top));
					ui.position.left = constrained.x; ui.position.top = -constrained.y;
				},
			});
    }
  }, [tab])

  function send(macro) {
    conn(state.hostip, state.fileid, macro)
  }

  // Returns true if point P inside the triangle with vertices at A, B and C
  // representing 2D vectors and points as [x,y]. Based on                        
  // http://www.blackpawn.com/texts/pointinpoly/default.html
  function pointInTriangle(P, A, B, C) {
    // Compute vectors        
    function vec(from, to) {  return [to[0] - from[0], to[1] - from[1]];  }
    var v0 = vec(A, C);
    var v1 = vec(A, B);
    var v2 = vec(A, P);
    // Compute dot products
    function dot(u, v) {  return u[0] * v[0] + u[1] * v[1];  }
    var dot00 = dot(v0, v0);
    var dot01 = dot(v0, v1);
    var dot02 = dot(v0, v2);
    var dot11 = dot(v1, v1);
    var dot12 = dot(v1, v2);
    // Compute barycentric coordinates
    var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
  }

  return (
    <>
      <div className={styles.top_row}>
        <BlockButton selected={tab === COMBAT_TABS.POWER} onClick={() => setTab(COMBAT_TABS.POWER)}>POWER</BlockButton>
        <BlockButton style={{ margin: '0 12px' }} selected={tab === COMBAT_TABS.TARGETING} onClick={() => setTab(COMBAT_TABS.TARGETING)}>TARGETING</BlockButton>
        <BlockButton selected={tab === COMBAT_TABS.SHIELDS} onClick={() => setTab(COMBAT_TABS.SHIELDS)}>SHIELDS</BlockButton>
      </div>

      {tab === COMBAT_TABS.POWER && (
        <>
          <div className={styles.content__rows_container} className="map" style={{
            width: '300px',
            height: '300px',
            position: 'relative'
          }}>
            <svg height="100%" width="100%">
              <polygon ref={polyRef} points="0,300 300,300 150,50" style={{ fill: 'var(--primary20)' }} />
            </svg>
            <div ref={handleRef} className="map-selector" style={{
              display: 'inline-block',
              width: '15px',
              height: '15px',
              border: '1px solid var(--danger)',
              borderRadius: '50%',
              position: 'absolute',
              top: '200px',
              left: '150px',
              marginTop: '-8px',
              marginLeft: '-8px',
            }}>
            </div>
          </div>

          <div className={styles.bottom_row}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>POWER</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>SHIELDS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>ENGINES</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>WEAPONS</BlockButton>
            </div>
          </div>
        </>
      )}

      {tab === COMBAT_TABS.TARGETING && (
        <>
          <div className={styles.content__rows_container}>
            {isMobileDevice ? (
              <div style={{ position: 'relative' }}>
                <SpoolButton onClick={() => send('macro26')}/>
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  height: '80px',
                  width: '100%',
                  backgroundColor: 'var(--black80)',
                  zIndex: 20,
                }}>
                  <BlockButton style={{ height: '100%' }} onClick={() => send('macro25')}>INITIATE SPOOL</BlockButton>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.content__row}>
                  <div className={styles.content__row_left} onClick={() => send('macro10')}>FLIGHT READY</div>
                  <div className={styles.content__row_right} onClick={() => {}}>right</div>
                </div>
                <div className={styles.content__row}>
                  <div className={styles.content__row_left} onClick={() => {}}>left</div>
                  <div className={styles.content__row_right} onClick={() => {}}>right</div>
                </div>
                <div className={styles.content__row}>
                  <div className={styles.content__row_left} onClick={() => {}}>left</div>
                  <div className={styles.content__row_right} onClick={() => {}}>right</div>
                </div>

                <SpoolButton onClick={() => null}/>
              </>
            )}
          </div>

          <div className={styles.bottom_row}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>POWER</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>SHIELDS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>ENGINES</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%', height: '100%' }}>WEAPONS</BlockButton>
            </div>
          </div>
        </>
      )}

      {tab === COMBAT_TABS.SHIELDS && (
        <>
          <div className={styles.content__rows_container}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>CYCLE CAMERA</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')}>VTOL</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>LIMITER TOGGLE</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')}>CRUISE CONTROL</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>SELF DESTRUCT</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>EJECT</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')}>GIMBAL MODE</BlockButton>
            </div>

            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>DECOUPLE</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>GSAFE</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>ESP</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>WEAPONS</BlockButton>
            </div>
          </div>
          <div className={styles.bottom_row}>
            <div className={styles.row}>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>POWER</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>SHIELDS</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>ENGINES</BlockButton>
              <div className={styles.h_spacer}></div>
              <BlockButton onClick={() => send('macro10')} style={{ minWidth: '25%' }}>WEAPONS</BlockButton>
            </div>
          </div>
        </>
      )}
    </>
  )
}