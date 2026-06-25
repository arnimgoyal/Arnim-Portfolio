interface ContactButtonProps {
  className?: string;
}

export default function ContactButton({ className = "" }: ContactButtonProps) {
  return (
    <a
      href="#contact"
      className={`rounded-full font-medium uppercase tracking-widest text-white text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-transform duration-200 hover:scale-105 active:scale-95 inline-block ${className}`}
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1, 0 0 0 2px white",
      }}
    >
      Contact Me
    </a>
  );
}

