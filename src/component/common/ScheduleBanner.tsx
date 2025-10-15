import React from "react";
import { scheduleBanner } from "../../images";

type Props = {
  // 메인 이미지(없으면 배지+텍스트만 렌더)
  src?: string;
  showImage?: boolean;       // 기본 true

  // 배지
  badgeSrc?: string;         // 배지 이미지(필수)
  badgeHeight?: number;      // 배지 높이(px), 기본 32

  // 텍스트
  dateText: string;
  venueName: string;
  venueAddress?: string;

  // 레이아웃
  maxWidth?: number;         // 컨테이너 최대폭, 기본 720
  topGap?: number;           // 섹션 상단 여백(px), 기본 0
};

export default function ScheduleBanner({
  src = scheduleBanner,
  showImage = true,
  badgeSrc,
  badgeHeight = 32,
  dateText,
  venueName,
  venueAddress,
  maxWidth = 720,
  topGap = 0,
}: Props) {
  const wrap: React.CSSProperties = {
    width: "100%",
    maxWidth,
    margin: `${topGap}px auto 0`,
  };
  const imgStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    height: "auto",
  };
  const info: React.CSSProperties = {
    textAlign: "center",
    padding: "10px 8px 0",
    lineHeight: 1.45,
  };

  return (
    <section className="sched sched--badge-only" style={{ width: "100%" }}>
      <div className="sched__wrap" style={wrap}>
        {/* 배경 이미지 생략 가능 */}
        {showImage && <img className="sched__img" src={src} alt="" style={imgStyle} />}

        {/* 배지만 표시 (width:auto로 커지지 않게 고정 높이) */}
        {badgeSrc && (
          <img
            className="sched__badge"
            src={badgeSrc}
            alt="save the date"
            style={{
              display: "block",
              height: badgeHeight,
              width: "auto",
              margin: showImage ? "14px auto 10px" : "0 auto 10px",
              objectFit: "contain",
            }}
          />
        )}

        {/* 일정/장소/주소 */}
        <div className="sched__info" style={info}>
          <div style={{ fontWeight: 700, letterSpacing: ".02em", margin: "4px 0 2px" }}>
            {dateText}
          </div>
          <div style={{ fontWeight: 700, margin: "4px 0 2px" }}>{venueName}</div>
          {venueAddress && <div style={{ opacity: 0.9, margin: "2px 0 0" }}>{venueAddress}</div>}
        </div>
      </div>
    </section>
  );
}
