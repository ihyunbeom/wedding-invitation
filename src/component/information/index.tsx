import React from "react";
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
}: {
  title: string;
  items: Account[];
}) {
  return (
    <div className="info__group">
      <div className="info__group-title">{title}</div>
      <hr className="info__divider" />
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

export default function Information({
  titleImg, // 상단 배지 이미지를 넘기고 싶다면 prop으로
}: {
  titleImg?: string;
}) {
  return (
    <section className="information card">
      {/* 상단 배지 */}
      <div className="info__title-wrap">        
          <img className="info__title-img" src={heartTitle} alt="마음 전하실 곳" />  
      </div>

      {/* 신랑측 */}
      <AccountList title="🤵 신랑측 계좌번호" items={GROOM_ACCOUNTS} />

      {/* 구분선 */}
      <div className="info__section-sep" />

      {/* 신부측 */}
      <AccountList title="👰 신부측 계좌번호" items={BRIDE_ACCOUNTS} />

      {/* 하단 안내 */}
      {/* <div className="info__note">
        <span className="info__flower" aria-hidden>🌸</span>
        화환은 정중히 사양합니다
      </div> */}
    </section>
  );
}
