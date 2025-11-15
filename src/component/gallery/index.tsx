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

  const showPrev = (e?: React.MouseEvent) => {
    // 바깥 클릭으로 전달되지 않도록
    e?.stopPropagation();
    setOpenIndex((prev) => {
      if (prev === null) return 0;
      const len = images.length;
      return (prev - 1 + len) % len; // 순환
    });
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenIndex((prev) => {
      if (prev === null) return 0;
      const len = images.length;
      return (prev + 1) % len; // 순환
    });
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
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        // 키보드 ← → 로도 이동 가능하게 (옵션)
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") showPrev();
          if (e.key === "ArrowRight") showNext();
          if (e.key === "Escape") close();
        }}
      >
        <div className="lightbox__wrap">
          {/* 닫기 버튼 */}
          <button
            className="lightbox__close"
            type="button"
            aria-label="닫기"
            onClick={close}
          >
            ✕
          </button>

          {/* 좌우 이동 버튼 */}
          {openIndex !== null && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                aria-label="이전 사진"
                onClick={showPrev}
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                aria-label="다음 사진"
                onClick={showNext}
              >
                ›
              </button>
            </>
          )}

          {/* 큰 이미지 */}
          {openIndex !== null && (
            <img
              src={images[openIndex]}
              alt={`g${openIndex + 1} 확대`}
            />
          )}
        </div>
      </dialog>
    </section>
  );
}
