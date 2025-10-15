import { useEffect } from "react";
import { ENV } from "../../env";
import { copyText, initKakao, shareKakao, shareNative } from "../common/utils";

export function ShareButton() {
  useEffect(() => { initKakao(ENV.KAKAO_KEY); }, []);
  const url = ENV.SITE_URL || window.location.href;

  const onCopy = () => copyText(url);
  const onShareKakao = () =>
    shareKakao({
      title: "이현범과 이아람 결혼합니다.🤵🏻‍♂️👰🏻‍♀️",
      description: "2026.01.11 (일) 오후 12:40 | 라마다 신도림 호텔",
      imageUrl: "/preview_image.png",
      url,
    });
  const onShareNative = () => shareNative({ title: "초대장", text: "초대합니다", url });

  return (
    <div className="sharebar">
      <button onClick={onShareKakao}>카카오톡 공유</button>
      <button onClick={onShareNative}>공유</button>
      <button onClick={onCopy}>주소 복사</button>
    </div>
  );
}
