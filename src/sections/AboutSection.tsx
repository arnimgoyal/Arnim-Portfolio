import FadeIn from "@/components/FadeIn";
import AnimatedText from "@/components/AnimatedText";
import ContactButton from "@/components/ContactButton";

const aboutText =
  "I'm a Full Stack Developer with hands-on experience in Python, Flutter, Node.js, and SQL databases. I specialize in building AI-powered applications — from intelligent chatbots to multi-agent systems. I love turning complex problems into elegant, scalable solutions. Let's build something incredible together!";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative Images */}
      {/* Top-left: Moon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute z-10 top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="/images/about-moon.png"
          alt="Decorative 3D moon"
          className="w-full h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Top-right: Lego */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute z-10 top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="/images/about-lego.png"
          alt="Decorative 3D lego brick"
          className="w-full h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Bottom-left: 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute z-10 bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]"
      >
        <img
          src="/images/about-object.png"
          alt="Decorative 3D geometric object"
          className="w-full h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Bottom-right: 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute z-10 bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]"
      >
        <img
          src="/images/about-group.png"
          alt="Decorative 3D shapes group"
          className="w-full h-auto"
          loading="lazy"
        />
      </FadeIn>

      {/* Content */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-20">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.9}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph */}
        <AnimatedText
          text={aboutText}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        />

        {/* CTA Button */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.2} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
