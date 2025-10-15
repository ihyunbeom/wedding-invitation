import { useEffect } from "react";
import { ENV } from "../../env";
import { copyText, initKakao, shareKakaoCustom, shareNative } from "../common/utils";

export function ShareButton() {
  useEffect(() => { initKakao(ENV.KAKAO_KEY); }, []);
  const url = ENV.SITE_URL || window.location.href;

  const onCopy = () => copyText(url);
  const onShareNative = () => shareNative({ title: "초대장", text: "초대합니다", url });
  
  const onShareKakao = () =>
    shareKakaoCustom({
      templateId: 125073,                 // ✅ 만든 템플릿 ID
      templateArgs: {
        // 템플릿에서 정의한 변수명과 일치해야 합니다 (예시는 흔한 키 이름)
        title: "이현범 · 이아람 결혼식 초대장",
        desc:  "2026.01.11 (일) 12:40 · 라마다 신도림 호텔",
        imageUrl: `${url.replace(/\/$/, "")}/preview_image.png?v=20251026`, // ✅ 절대경로(https)
        link: url,                        // 초대장 열기 링크
      },
    });

  return (
    <div className="sharebar">
      <button onClick={onShareKakao}>카카오톡 공유</button>
      {/* <button onClick={onShareNative}>공유</button>
      <button onClick={onCopy}>주소 복사</button> */}
    </div>
  );
}
