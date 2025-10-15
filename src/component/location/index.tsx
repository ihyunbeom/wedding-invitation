import { Map } from "./map";
import CarIcon from "../../icons/car-icon.svg?react";
import BusIcon from "../../icons/bus-icon.svg?react";
import { LazyDiv } from "../lazyDiv";
import { LOCATION, LOCATION_ADDRESS } from "../../const";
import comingTitle from "../../images/coming-title.png";

import "./index.scss";

// 배지(오시는 길) 이미지 경로 — 준비한 파일로 바꿔 주세요.
const titleImg = "/images/coming-title.png"; // 예: public/images/coming-title.png

export const Location = () => {
  const copyAddr = async () => {
    try {
      await navigator.clipboard.writeText(LOCATION_ADDRESS);
      alert("주소가 복사되었습니다.");
    } catch {
      // 일부 브라우저/https 미사용 환경 대비
      const textarea = document.createElement("textarea");
      textarea.value = LOCATION_ADDRESS;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      alert("주소가 복사되었습니다.");
    }
  };

  return (
    <>
      {/* 1) 타이틀 배지 + 지도 */}
      <LazyDiv className="card location-card">
        <div className="loc__title-wrap">
          <img className="loc__title-img" src={comingTitle} alt="오시는 길" />          
        </div>

        <div className="loc__map">
          <Map />
        </div>

        {/* 2) 주소 + 복사 버튼 */}
        <div className="loc__addr">
          <div className="loc__addr-text">
            <div className="addr-main">{LOCATION_ADDRESS}</div>
            <div className="addr-place">{LOCATION}</div>
          </div>
          <button className="copy-btn" type="button" onClick={copyAddr}>
            복사하기
          </button>
        </div>
      </LazyDiv>

      {/* 3) 교통/자가용 안내 */}
      <LazyDiv className="card location-card">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * <b>지하철</b> 이용시
            <br />
            1, 2호선 <b>신도림역 1번 출구</b> (광장 도보 5분)
            <br />
            <br />
            * <b>버스</b> 이용 시
            <br />
            간선(파랑): 160, 503, 600, 662, 670
            <br />
            지선(초록): 6513, 6515, 6516, 6637, 6640A
            <br />
            경기일반: 10, 11-1, 11-2, 301, 510, 83, 88-1, 88
          </div>
        </div>

        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            서울시 구로구 신도림동 432-30
            <br />
            <b>라마다서울신도림 호텔</b>
            <br />
            건물 주차장 이용 (주차 1시간 30분 무료)
          </div>
        </div>
      </LazyDiv>
    </>
  );
};
