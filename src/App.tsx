// import { Cover } from "./component/cover"
// import { Location } from "./component/location"
// import "./App.scss"
// import { BGEffect } from "./component/bgEffect"
// import { Invitation } from "./component/invitation"
// import { Calendar } from "./component/calendar"
// import { Gallery } from "./component/gallery"
// import { Information } from "./component/information"
// import { GuestBook } from "./component/guestbook"
// import { LazyDiv } from "./component/lazyDiv"
// import { ShareButton } from "./component/shareButton"
// import { STATIC_ONLY } from "./env"

// function App() {
//   return (
//     <div className="background">
//       <BGEffect />
//       <div className="card-view">
//         <LazyDiv className="card-group">
//           {/* 표지 */}
//           <Cover />

//           {/* 모시는 글 */}
//           <Invitation />
//         </LazyDiv>

//         <LazyDiv className="card-group">
//           {/* 결혼식 날짜 (달력) */}
//           <Calendar />

//           {/* 겔러리 */}
//           <Gallery />
//         </LazyDiv>

//         <LazyDiv className="card-group">
//           {/* 오시는길 */}
//           <Location />
//         </LazyDiv>

//         <LazyDiv className="card-group">
//           {/* 마음 전하기 */}
//           <Information />
//           {/* 방명록 */}
//           {!STATIC_ONLY && <GuestBook />}
//         </LazyDiv>

//         <ShareButton />
//       </div>
//     </div>
//   )
// }

// export default App

// src/App.tsx (핵심: 순서만 맞추면 됩니다)
import "./App.scss";
import FullImage from "./component/common/FullImage";
import HandLetter from "./component/common/HandLetter";
import ScheduleBanner from "./component/common/ScheduleBanner";
import { coverTop, scheduleBanner, photo01, letter00, photo02, parentsGroom, parentsBride, letterGroom, letterBride } from "./images";
// 또는 from "@/images" (별칭을 쓰고 있다면)


// (이미 있는 섹션들)
import { Calendar } from "./component/calendar"
import { Location } from "./component/location";
import Information from "./component/information";
import { Gallery } from "./component/gallery";
import { ShareButton } from "./component/shareButton";
import { BGEffect } from "./component/bgEffect"
import { STATIC_ONLY } from "./env";
import { GuestBook } from "./component/guestbook"; // 서버/폼에 따라 분기

export default function App() {
  return (
    <div className="wp">
    <>
      {/* 1) 최상단 이미지 */}
      <FullImage src={coverTop} alt="cover" fade />

      <div className="pt-64"></div>

      {/* 2) 일정/장소 안내텍스트 위 이미지 (배너) */}
      <ScheduleBanner
        showImage={false}            // ← 배경 이미지 끔
        badgeSrc={scheduleBanner}      // ← 배지 넣기
        badgeHeight={64}          // 필요하면 28~36 사이로 조절
        dateText="2026.1.11 (일) 오후 12시 40분"
        venueName="라마다 서울 신도림 호텔 하늘정원홀 14층"
        venueAddress="서울시 구로구 경인로 624"
      />
      
      <div className="pt-64"></div>

      {/* 3) 큰 이미지 */}
      <HandLetter src={photo01} alt="photo-01" />
      
      <div className="pt-64"></div>

      {/* 4) 손글씨 1 (인트로 메시지) */}
      <HandLetter src={letter00} alt="letter-00" rotate={0} />
      
      <div className="pt-64"></div>

      {/* 5) 큰 이미지 */}
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

      {/* (원 페이지 구성에 맞춰 아래 섹션들 이어서) */}
      <Gallery />
      
      <div className="pt-64 bg-sky">
      <Calendar />
      </div>
      <Location />
      <Information />
      <div className="pt-24"></div>
      <ShareButton />
      <div className="pt-64"></div>
      {/* <BGEffect /> */}
    </>
    </div>
  );
}