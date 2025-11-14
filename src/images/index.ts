/* src/images/index.ts
   - src/images/image1.png ~ image12.png 자동 수집 (누락/순서 꼬임 방지)
   - 개별 리소스도 함께 export
*/

export { default as coverTop }        from "./cover-top.jpg";
export { default as scheduleBanner }  from "./schedule-banner.png";
export { default as photo01 }         from "./photo-01.jpg";
export { default as photo02 }         from "./photo-02.jpg";
export { default as letter00 }        from "./letter-00.jpg";
export { default as letterGroom }     from "./letter-groom.jpg";
export { default as letterBride }     from "./letter-bride.jpg";
export { default as parentsGroom }    from "./parents-groom.jpg";
export { default as parentsBride }    from "./parents-bride.jpg";

/* 갤러리 이미지 자동 수집: image1.png ~ image12.png
   - 파일을 추가/삭제해도 자동 반영
   - 오름차순 정렬 보장
*/
const modules = import.meta.glob("./image*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const GALLERY_IMAGES: string[] = Object.entries(modules)
  .sort((a, b) => {
    const na = Number(a[0].match(/image(\d+)\.jpg$/)?.[1] ?? 0);
    const nb = Number(b[0].match(/image(\d+)\.jpg$/)?.[1] ?? 0);
    return na - nb;
  })
  .map(([, src]) => src);
