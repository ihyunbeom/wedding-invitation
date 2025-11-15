// src/App.tsx
import React, { useEffect, useRef, useState } from "react";
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

import { Calendar } from "./component/calendar";
import { Location } from "./component/location";
import Information from "./component/information";
import { Gallery } from "./component/gallery";
import { ShareButton } from "./component/shareButton";

// mp3 위치에 맞게 수정
import bgmSrc from "./component/music/wedding_bgm.mp3";

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 오디오 준비 + 최초 자동 재생 시도
  useEffect(() => {
    const audio = new Audio(bgmSrc);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const tryAutoPlay = async () => {
      try {
        await audio.play();        // 일부 브라우저/카카오에서는 막힐 수 있음
        setIsPlaying(true);
      } catch (err) {
        console.log("자동재생이 차단되어 수동 재생만 가능합니다.", err);
        setIsPlaying(false);
      }
    };

    tryAutoPlay();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleBgm = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("BGM 재생 실패:", err);
      }
    }
  };

  return (
    <div className="wp">
      {/* 🎵 BGM 토글 버튼 (커버 사진 위, 우측 상단) */}
      <button
        type="button"
        className={`bgm-toggle ${isPlaying ? "on" : "off"}`}
        onClick={toggleBgm}
      >
        <span className="bgm-icon">♪</span>
        <span className="bgm-text">{isPlaying ? "ON" : "OFF"}</span>
      </button>

      {/* 1) 커버 이미지 */}
      <FullImage src={coverTop} alt="cover" fade />

      <div className="pt-128" />

      {/* 2) 일정/장소 배너 */}
      {/* <ScheduleBanner
        showImage={false}
        badgeSrc={scheduleBanner}
        badgeHeight={64}
        dateText="2026.1.11 (일) 오후 12시 40분"
        venueName="라마다 서울 신도림 호텔 하늘정원홀 14층"
        venueAddress="서울시 구로구 경인로 624"
      /> */}
      <FullImage src={scheduleBanner} alt="scheduleBanner" fade />

      <div className="pt-128" />

      {/* 이하 기존 구성 그대로 */}
      <HandLetter src={photo01} alt="photo-01" />
      <div className="pt-64" />
      <HandLetter src={letter00} alt="letter-00" rotate={0} />
      <FullImage src={photo02} alt="photo-02" />
      <div className="pt-128" />
      <HandLetter src={parentsGroom} alt="parents-groom" rotate={0} />
      {/* <HandLetter src={parentsBride} alt="parents-bride" rotate={0} /> */}
      <FullImage src={letterGroom} alt="letter-groom" />
      <FullImage src={letterBride} alt="letter-bride" />

      <Gallery />

      <div className="pt-128 bg-sky">
        <Calendar />
      </div>

      <Location />
      <Information />

      <div className="pt-24" />
      <ShareButton />
      <div className="pt-64" />
    </div>
  );
}
