import { useRef, useEffect } from "react";

const row1Images = [
  "/images/marquee/marquee-1.jpg",
  "/images/marquee/marquee-2.jpg",
  "/images/marquee/marquee-3.jpg",
  "/images/marquee/marquee-4.jpg",
  "/images/marquee/marquee-5.jpg",
  "/images/marquee/marquee-6.jpg",
  "/images/marquee/marquee-7.jpg",
  "/images/marquee/marquee-8.jpg",
  "/images/marquee/marquee-9.jpg",
  "/images/marquee/marquee-10.jpg",
  "/images/marquee/marquee-11.jpg",
];

const row2Images = [
  "/images/marquee/marquee-12.jpg",
  "/images/marquee/marquee-13.jpg",
  "/images/marquee/marquee-14.jpg",
  "/images/marquee/marquee-15.jpg",
  "/images/marquee/marquee-16.jpg",
  "/images/marquee/marquee-17.jpg",
  "/images/marquee/marquee-18.jpg",
  "/images/marquee/marquee-19.jpg",
  "/images/marquee/marquee-20.jpg",
  "/images/marquee/marquee-21.jpg",
];

function tripleImages(images: string[]) {
  return [...images, ...images, ...images];
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row1Tripled = tripleImages(row1Images);
  const row2Tripled = tripleImages(row2Images);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      {/* Row 1 - moves RIGHT on scroll */}
      <div
        ref={row1Ref}
        className="flex gap-3 mb-3"
        style={{ willChange: "transform" }}
      >
        {row1Tripled.map((src, i) => (
          <img
            key={`r1-${i}`}
            src={src}
            alt={`Portfolio work ${(i % row1Images.length) + 1}`}
            className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      {/* Row 2 - moves LEFT on scroll */}
      <div
        ref={row2Ref}
        className="flex gap-3"
        style={{ willChange: "transform" }}
      >
        {row2Tripled.map((src, i) => (
          <img
            key={`r2-${i}`}
            src={src}
            alt={`Portfolio work ${(i % row2Images.length) + 12}`}
            className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
