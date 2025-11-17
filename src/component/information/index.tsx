import React, { useState } from "react";
import "./index.scss";

// (옵션) 상단 배지 이미지가 있으면 import 해서 넘겨주세요.
import heartTitle from "../../images/heart-title.png";

type Account = { bank: string; number: string; name: string };

const GROOM_ACCOUNTS: Account[] = [
  { bank: "기업", number: "082-112875-01-011", name: "이현범" },
  { bank: "국민", number: "094701-04-275549", name: "이계현" },
  { bank: "농협", number: "100028-56-057787", name: "이현숙" },
];

const BRIDE_ACCOUNTS: Account[] = [
  { bank: "우리", number: "1002-961-272516", name: "이아람" },
  { bank: "새마을금고", number: "9002-1792-2255-0", name: "이동일" },
  { bank: "국민", number: "167-21-0149-184", name: "양미경" },
];

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert("계좌번호가 복사되었습니다.");
  } catch {
    // http 환경 등 clipboard API 미지원 대비
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    alert("계좌번호가 복사되었습니다.");
  }
}

function AccountList({
  title,
  items,
  hideTitle,
}: {
  title: string;
  items: Account[];
  hideTitle?: boolean;
}) {
  return (
    <div className="info__group">
      {!hideTitle && (
        <>
          <div className="info__group-title">{title}</div>
          <hr className="info__divider" />
        </>
      )}
      <ul className="info__list">
        {items.map((it, idx) => (
          <li key={idx} className="info__item">
            <div className="info__text">
              <div className="info__bankno">
                {it.bank} {it.number}
              </div>
              <div className="info__name">{it.name}</div>
            </div>
            <button
              type="button"
              className="info__copy"
              onClick={() => copy(`${it.bank} ${it.number}`)}
            >
              복사하기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Side = "groom" | "bride" | null;

export default function Information({
  titleImg,
}: {
  titleImg?: string;
}) {
  const [openSide, setOpenSide] = useState<Side>(null);

  const openModal = (side: Side) => setOpenSide(side);
  const closeModal = () => setOpenSide(null);

  return (
    <section className="information card">
      {/* 상단 배지 */}
      <div className="info__title-wrap">
        <img
          className="info__title-img"
          src={titleImg ?? heartTitle}
          alt="마음 전하실 곳"
        />
      </div>

      {/* 정중한 안내 문구 */}
      <p className="info__notice">
        바쁘신 가운데 직접 참석하지 못하시더라도<br />
        축하의 마음을 전해주실 수 있도록<br />
        신랑·신부 측 계좌번호를 안내드립니다.<br />
        따뜻한 마음만으로도 큰 힘이 됩니다.<br /><br />
      </p>

      {/* 버튼: 세로 배치 (신랑 ▶ 신부) */}
      <div className="info__button-column">
        <button
          type="button"
          className="info__open-btn info__open-btn--groom"
          onClick={() => openModal("groom")}
        >
          🤵 신랑측 계좌번호 보기
        </button>
        <button
          type="button"
          className="info__open-btn info__open-btn--bride"
          onClick={() => openModal("bride")}
        >
          👰 신부측 계좌번호 보기
        </button>
      </div>

      {/* 팝업 */}
      {openSide && (
        <div className="info-modal" onClick={closeModal}>
          <div className="info-modal__backdrop" />

          <div
            className="info-modal__dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="info-modal__header">
              <div className="info-modal__title">
                {openSide === "groom"
                  ? "🤵 신랑측 계좌번호"
                  : "👰 신부측 계좌번호"}
              </div>
              <button
                type="button"
                className="info-modal__close"
                onClick={closeModal}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* 리스트는 기존 그대로 사용 */}
            <AccountList
              title=""
              items={openSide === "groom" ? GROOM_ACCOUNTS : BRIDE_ACCOUNTS}
              hideTitle
            />
          </div>
        </div>
      )}
    </section>
  );
}
