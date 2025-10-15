import React, { useRef, useState } from "react";
import { GALLERY_IMAGES } from "../../images";
import "./style.scss";

export function Gallery() {
  // 총 15장만 사용
  const images = GALLERY_IMAGES.slice(0, 15);

  // 라이트박스 상태
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = (idx: number) => {
    setOpenIndex(idx);
    // <dialog> 열기
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const close = () => {
    dialogRef.current?.close();
    setOpenIndex(null);
  };

  return (
    <section className="gallery">
      <div className="grid grid--3">
        {images.map((src, i) => (
          <button
            key={i}
            className="item"
            type="button"
            onClick={() => open(i)}
            aria-label={`사진 ${i + 1} 크게 보기`}
          >
            <img src={src} alt={`g${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {/* 라이트박스 */}
      <dialog
        className="lightbox"
        ref={dialogRef}
        onClose={close}
        // 배경(바깥) 클릭 시 닫기
        onClick={(e) => { if (e.target === dialogRef.current) close(); }}
      >
        <div className="lightbox__wrap">
          {/* ✅ 항상 보이는 닫기 버튼 (우상단) */}
          <button
            className="lightbox__close"
            type="button"
            aria-label="닫기"
            onClick={close}
          >
            ✕
          </button>

          {/* 큰 이미지 */}
          {openIndex !== null && (
            <img src={images[openIndex]} alt={`g${openIndex + 1} 확대`} />
          )}
        </div>
      </dialog>
    </section>
  );
}
