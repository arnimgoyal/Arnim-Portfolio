import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";

const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];

const customEase = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "0px" });

  // "Arni" and "m" as separate words for pull-up animation
  const headingWords = ["Arni"];

  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            type="video/mp4"
          />
        </video>

        {/* Noise Overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none z-[1]" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[2]" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[10px] sm:text-xs md:text-sm font-normal whitespace-nowrap transition-colors duration-200"
                style={{ color: "rgba(225, 224, 204, 0.8)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#E1E0CC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")
                }
              >
                {link}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero Content - Bottom Aligned */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-10 lg:px-10 lg:pb-12">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Left 8 columns - Giant Heading */}
            <div className="col-span-12 md:col-span-8" ref={headingRef}>
              <h1
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] relative inline-block"
                style={{ color: "#E1E0CC" }}
              >
                <span style={{ overflow: "hidden", display: "inline-block" }}>
                  {headingWords.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        isInView
                          ? { y: 0, opacity: 1 }
                          : { y: 20, opacity: 0 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                        ease: customEase,
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                {/* "m" with superscript asterisk */}
                <span className="relative inline-block" style={{ overflow: "hidden" }}>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                      isInView
                        ? { y: 0, opacity: 1 }
                        : { y: 20, opacity: 0 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: headingWords.length * 0.08,
                      ease: customEase,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    m
                  </motion.span>
                  <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                    *
                  </span>
                </span>
              </h1>
            </div>

            {/* Right 4 columns - Description + CTA */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4 sm:gap-5 pb-1 md:pb-2">
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: customEase,
                }}
                className="text-xs sm:text-sm md:text-base"
                style={{ color: "rgba(225, 224, 204, 0.7)", lineHeight: 1.2 }}
              >
                Full Stack Developer specializing in Python, Flutter, Node.js
                and SQL — building intelligent AI-powered systems and scalable
                applications that solve real-world problems.
              </motion.p>

              {/* CTA Button and Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: customEase,
                }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 self-start"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 hover:gap-3 transition-all duration-300 rounded-full font-medium text-sm sm:text-base pl-5 pr-1.5 py-1.5"
                  style={{ backgroundColor: "#E1E0CC", color: "#000" }}
                >
                  <span>Get in touch</span>
                  <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: "#E1E0CC" }}
                    />
                  </span>
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/arnimgoyal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(225,224,204,0.2)] flex items-center justify-center transition-all duration-300 hover:bg-[rgba(225,224,204,0.1)] hover:border-[rgba(225,224,204,0.5)]"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#E1E0CC" }} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/arnim-goyal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(225,224,204,0.2)] flex items-center justify-center transition-all duration-300 hover:bg-[rgba(225,224,204,0.1)] hover:border-[rgba(225,224,204,0.5)]"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#E1E0CC" }} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
