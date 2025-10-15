// src/component/common/HandLetter.tsx
export default function HandLetter({
  src, alt, rotate = 0,
}: { src:string; alt?:string; rotate?:number }) {
  return (
    <section className="handletter" style={{ transform:`rotate(${rotate}deg)` }}>
      <img src={src} alt={alt ?? "letter"} />
    </section>
  );
}
