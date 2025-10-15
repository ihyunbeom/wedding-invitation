import { useEffect } from "react";
import { ENV } from "../../env";
import { copyText, initKakao, shareKakao, shareNative } from "../common/utils";

export function ShareButton() {
  useEffect(() => { initKakao(ENV.KAKAO_KEY); }, []);
  const url = ENV.SITE_URL || window.location.href;

  const onCopy = () => copyText(url);
  const onShareKakao = () =>
    shareKakao({
      title: "초대합니다",
      description: "우리의 결혼식에 초대합니다",
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
