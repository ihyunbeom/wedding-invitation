// src/component/common/FullImage.tsx
export default function FullImage({ src, alt, fade = false }: { src:string; alt?:string; fade?:boolean }) {
  return (
    <section className={`fullimg ${fade ? "fullimg--fade" : ""}`}>
      <img src={src} alt={alt ?? "image"} />
      {/* {fade && <span className="fade" />} */}
    </section>
  );
}
