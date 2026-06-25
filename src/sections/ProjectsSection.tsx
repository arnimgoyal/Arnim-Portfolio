import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import LiveProjectButton from "@/components/LiveProjectButton";

const projects = [
  {
    num: "01",
    category: "AI · Chatbot",
    name: "Website Chatbot",
    image: "/images/projects/chatbot.png",
    desc: "An AI-powered chatbot that crawls and learns from any website's content, then answers user questions contextually. It can be embedded into any website by simply pasting a single script tag — no complex integration or setup required.",
  },
  {
    num: "02",
    category: "AI · Analytics",
    name: "Analyst BOT",
    image: "/images/projects/analyst-bot.png",
    desc: "Connects to databases and other data sources, allowing users to generate detailed reports and perform deep analysis through natural language. Empowers business teams to make critical, data-driven decisions without needing SQL expertise.",
  },
  {
    num: "03",
    category: "Agentic AI · Healthcare",
    name: "Roster IQ",
    image: "/images/projects/roster-iq.png",
    desc: "An agentic AI analysis tool built for the healthcare industry. It processes and analyzes large volumes of roster files communicated between hospitals and insurance companies — automating validation, comparison, and compliance checking at scale.",
  },
  {
    num: "04",
    category: "Web3 · Agentic AI",
    name: "Web3 Agentic AI",
    image: "/images/projects/web3-ai.png",
    desc: "A multi-agent AI system where multiple AI agents communicate and collaborate autonomously. Equipped with various tools and capabilities, the agents can execute complex tasks while payments are automatically withdrawn from the user's crypto wallet.",
  },
];

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[0];
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 15%", "end 15%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="h-[85vh] relative"
      style={{ top: `${index * 28}px` }}
    >
      <motion.div
        className="sticky top-24 md:top-32 h-[calc(85vh-6rem)] md:h-[calc(85vh-8rem)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden"
        style={{ scale, willChange: "transform" }}
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
          {/* Left: Number + Category */}
          <div className="flex flex-col">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {project.num}
            </span>
            <span className="font-medium uppercase tracking-widest text-[#D7E2EA] text-sm sm:text-base">
              {project.category}
            </span>
          </div>

          {/* Right: Name + Button */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <h3 className="font-medium uppercase text-[#D7E2EA] text-lg sm:text-xl md:text-2xl">
              {project.name}
            </h3>
            <LiveProjectButton />
          </div>
        </div>

        {/* Bottom Row: Description + Image */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mt-4 flex-1 min-h-0">
          {/* Left Column: Project Description */}
          <div className="w-full md:w-[40%] flex items-center">
            <p
              className="text-[#D7E2EA] font-light leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)", opacity: 0.75 }}
            >
              {project.desc}
            </p>
          </div>

          {/* Right Column: 1 image */}
          <div className="w-full md:w-[60%]">
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} duration={0.9}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Projects
        </h2>
      </FadeIn>

      {/* Project Cards */}
      <div className="relative">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={index}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
