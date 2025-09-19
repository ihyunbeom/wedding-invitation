import { useEffect, useState, useRef } from "react"
import { useKakao, useNaver } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION, // [lng, lat]
} from "../../const"
import { NAVER_MAP_CLIENT_ID } from "../../env"

export const Map = () => {
  return NAVER_MAP_CLIENT_ID ? <NaverMap /> : <div>Map is not available</div>
}

const NaverMap = () => {
  const naver = useNaver()
  const kakao = useKakao()

  const mapEl = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<NodeJS.Timeout>()

  // 상수는 [lng, lat] 형태라고 가정
  const [lng, lat] = WEDDING_HALL_POSITION
  // Naver LatLng는 (lat, lng) 순서
  const centerLatLngTuple = { lat, lng }

  const checkDevice = () => {
    const ua = navigator.userAgent
    if (/(iPhone|iPod|iPad)/.test(ua)) return "ios"
    if (/Android/.test(ua)) return "android"
    return "other"
  }

  // 지도 초기화
  useEffect(() => {
    if (!naver || !mapEl.current) return
    const { maps } = naver

    const centerLatLng = new maps.LatLng(centerLatLngTuple.lat, centerLatLngTuple.lng)

    const map = new maps.Map(mapEl.current, {
      center: centerLatLng,
      zoom: 17,
      // 잠금 초기값 반영(잠금이면 조작 불가)
      draggable: !locked,
      pinchZoom: !locked,
      scrollWheel: !locked,
      keyboardShortcuts: !locked,
      disableDoubleTapZoom: locked,
      disableDoubleClickZoom: locked,
    })
    mapRef.current = map

    const marker = new maps.Marker({
      position: centerLatLng,
      map,
      title: LOCATION || "예식장",
    })
    markerRef.current = marker

    return () => {
      // Naver Maps는 destroy 제공 → 정리
      marker.setMap(null)
      map.destroy()
      mapRef.current = null
    }
    // naver만 의존 (locked/좌표는 아래 별도 useEffect에서 반영)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naver])

  // 좌표가 바뀌면 지도/마커를 갱신
  useEffect(() => {
    if (!mapRef.current || !naver) return
    const { maps } = naver
    const nextCenter = new maps.LatLng(centerLatLngTuple.lat, centerLatLngTuple.lng)
    mapRef.current.setCenter(nextCenter)
    if (markerRef.current) markerRef.current.setPosition(nextCenter)
  }, [naver, centerLatLngTuple.lat, centerLatLngTuple.lng])

  // 잠금 토글 시 실제 조작 옵션 변경
  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.setOptions({
      draggable: !locked,
      pinchZoom: !locked,
      scrollWheel: !locked,
      keyboardShortcuts: !locked,
      disableDoubleTapZoom: locked,
      disableDoubleClickZoom: locked,
    })
  }, [locked])

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(() => setShowLockMessage(false), 3000)
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(() => setShowLockMessage(false), 3000)
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}

        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            clearTimeout(lockMessageTimeout.current)
            setShowLockMessage(false)
            setLocked(v => !v)
          }}
          aria-label={locked ? "지도 잠금 해제" : "지도 잠금"}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>

        <div className="map-inner" ref={mapEl} />
      </div>

      <div className="navigation">
        {/* 네이버 지도 */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
                break
              default:
                window.open(`https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`, "_blank")
                break
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>

        {/* 카카오 내비 (모바일 앱 연동: x=lng, y=lat 주의) */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                if (kakao)
                  kakao.Navi.start({
                    name: LOCATION,
                    x: lng, // ← 경도
                    y: lat, // ← 위도
                    coordType: "wgs84",
                  })
                break
              default:
                window.open(`https://map.kakao.com/link/map/${KMAP_PLACE_ID}`, "_blank")
                break
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 내비
        </button>

        {/* 티맵 (모바일 앱 연동) */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: lng.toString(), // 경도
                  goaly: lat.toString(), // 위도
                  goalName: LOCATION,
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              }
              default:
                alert("모바일에서 확인하실 수 있습니다.")
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵
        </button>
      </div>
    </>
  )
}
