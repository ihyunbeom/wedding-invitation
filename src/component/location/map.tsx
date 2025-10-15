import { useEffect, useRef } from "react";
import { useKakao, useNaver } from "../store";
import nmapIcon from "../../icons/nmap-icon.png";
import knaviIcon from "../../icons/knavi-icon.png";
import tmapIcon from "../../icons/tmap-icon.png";
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
} from "../../const";
import { NAVER_MAP_CLIENT_ID } from "../../env";

export const Map = () => {
  return NAVER_MAP_CLIENT_ID ? <NaverMap /> : <div>Map is not available</div>;
};

const NaverMap = () => {
  const naver = useNaver();
  const kakao = useKakao();
  const ref = useRef<HTMLDivElement>(null);

  const checkDevice = () => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.match(/(iPhone|iPod|iPad)/)) return "ios";
    if (userAgent.match(/(Android)/)) return "android";
    return "other";
  };

  useEffect(() => {
    if (!naver || !ref.current) return;
    const map = new naver.maps.Map(ref.current, {
      center: WEDDING_HALL_POSITION,
      zoom: 17,
    });
    new naver.maps.Marker({ position: WEDDING_HALL_POSITION, map });
    return () => map.destroy();
  }, [naver]);

  return (
    <>
      <div className="map-wrapper">
        {/* ✅ 잠금 오버레이/버튼 제거 */}
        <div
          className="map-inner"
          ref={ref}
          style={{
            // 혹시 남아 있는 CSS가 포인터를 막는다면 확실히 해제
            pointerEvents: "auto",
            touchAction: "auto",
          }}
        />
      </div>

      {/* <div className="navigation">
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self");
                break;
              default:
                window.open(
                  `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                  "_blank"
                );
                break;
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>

        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                if (kakao)
                  kakao.Navi.start({
                    name: LOCATION,
                    x: WEDDING_HALL_POSITION[0],
                    y: WEDDING_HALL_POSITION[1],
                    coordType: "wgs84",
                  });
                break;
              default:
                window.open(
                  `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                  "_blank"
                );
                break;
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 내비
        </button>

        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: WEDDING_HALL_POSITION[0].toString(),
                  goaly: WEDDING_HALL_POSITION[1].toString(),
                  goalName: LOCATION,
                });
                window.open(`tmap://route?${params.toString()}`, "_self");
                break;
              }
              default: {
                alert("모바일에서 확인하실 수 있습니다.");
                break;
              }
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵
        </button>
      </div> */}
    </>
  );
};
