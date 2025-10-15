export const copyText = async (text: string) => {
  try { await navigator.clipboard.writeText(text); alert("복사되었습니다."); }
  catch {
    const ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy"); ta.remove();
    alert("복사되었습니다.");
  }
};

export const shareNative = async (data: ShareData) => {
  try { if (navigator.share) await navigator.share(data); }
  catch { /* 사용자 취소 등 무시 */ }
};

declare global { interface Window { Kakao?: any } }
export const initKakao = (key?: string) => {
  if (!key || !window.Kakao) return;
  if (!window.Kakao.isInitialized?.()) window.Kakao.init(key);
};

export const shareKakao = (args: { title: string; description: string; imageUrl: string; url: string }) => {
  if (!window.Kakao?.Share) { alert("카카오 공유를 사용할 수 없어요."); return; }
  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: args.title,
      description: args.description,
      imageUrl: args.imageUrl,
      link: { mobileWebUrl: args.url, webUrl: args.url },
    },
    buttons: [{ title: "초대장 보기", link: { mobileWebUrl: args.url, webUrl: args.url } }],
  });
};

export const openKakaoMap = (q: string) =>
  window.open(`https://map.kakao.com/?q=${encodeURIComponent(q)}`, "_blank");

export const openNaverMap = (q: string) =>
  window.open(`https://map.naver.com/v5/search/${encodeURIComponent(q)}`, "_blank");

export const openTMap = (lat: number, lng: number, name = "목적지") =>
  window.open(`tmap://route?goalx=${lng}&goaly=${lat}&goalname=${encodeURIComponent(name)}`);
