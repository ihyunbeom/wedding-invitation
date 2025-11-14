// src/App.tsx
import "./App.scss";

import FullImage from "./component/common/FullImage";
import HandLetter from "./component/common/HandLetter";
import ScheduleBanner from "./component/common/ScheduleBanner";
import {
  coverTop,
  scheduleBanner,
  photo01,
  letter00,
  photo02,
  parentsGroom,
  parentsBride,
  letterGroom,
  letterBride,
} from "./images";

// 기존 섹션 컴포넌트들
import { Calendar } from "./component/calendar";
import { Location } from "./component/location";
import Information from "./component/information";
import { Gallery } from "./component/gallery";
import { ShareButton } from "./component/shareButton";
// 필요 시 사용:
// import { BGEffect } from "./component/bgEffect";
// import { STATIC_ONLY } from "./env";
// import { GuestBook } from "./component/guestbook";

export default function App() {
  return (
    <div className="wp">
      {/* 1) 최상단 커버 이미지 */}
      <FullImage src={coverTop} alt="cover" fade />

      <div className="pt-64"></div>

      {/* 2) 일정/장소 안내 배너 */}
      <ScheduleBanner
        showImage={false}
        badgeSrc={scheduleBanner}
        badgeHeight={64}
        dateText="2026.1.11 (일) 오후 12시 40분"
        venueName="라마다 서울 신도림 호텔 하늘정원홀 14층"
        venueAddress="서울시 구로구 경인로 624"
      />

      <div className="pt-64"></div>

      {/* 3) 큰 사진 1 */}
      <HandLetter src={photo01} alt="photo-01" />

      <div className="pt-64"></div>

      {/* 4) 인트로 손글씨 */}
      <HandLetter src={letter00} alt="letter-00" rotate={0} />

      <div className="pt-64"></div>

      {/* 5) 큰 사진 2 */}
      <FullImage src={photo02} alt="photo-02" />

      <div className="pt-64"></div>

      {/* 6) 신랑 부모님 손글씨 */}
      <HandLetter src={parentsGroom} alt="parents-groom" rotate={0} />

      <div className="pt-64"></div>

      {/* 7) 신부 부모님 손글씨 */}
      <HandLetter src={parentsBride} alt="parents-bride" rotate={0} />

      {/* 8) 신랑 손글씨 */}
      <FullImage src={letterGroom} alt="letter-groom" />

      {/* 9) 신부 손글씨 */}
      <FullImage src={letterBride} alt="letter-bride" />

      {/* 10) 갤러리, 캘린더, 오시는 길, 안내 */}
      <Gallery />

      <div className="pt-64 bg-sky">
        <Calendar />
      </div>

      <Location />
      <Information />

      <div className="pt-24"></div>

      {/* ✅ ShareButton은 항상 노출 (숨김 처리 X) */}
      <ShareButton />

      <div className="pt-64"></div>

      {/* 필요 시 모션 배경 효과 / 방명록 섹션 */}
      {/* <BGEffect /> */}
      {/* {!STATIC_ONLY && <GuestBook />} */}
    </div>
  );
}
