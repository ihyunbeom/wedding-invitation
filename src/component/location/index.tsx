import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * <b>지하철</b> 이용시
            <br />
            1,2 호선 <b>신도림역 1번출구</b><br />
            (신도림역 광장 도보 5분)
            
          </div>
          <div />
          <div className="content">
            * <b>버스</b> 이용 시
            <br />
            - 간선(파랑): 160, 503, 600, 662, 670
            <br />
            - 지선(초록): 6513, 6515, 6516, 6637, 6640A
            <br />
            - 경기일반: 10, 11-1, 11-2, 301, 510, 83, 88-1, 88
            <br />
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
            건물 주차장 이용
            <br />
          </div>
          <div />          
        </div>
      </LazyDiv>
    </>
  )
}
