import FadeIn from "@/components/FadeIn";

const services = [
  {
    num: "01",
    name: "Python Development",
    desc: "Building robust backend systems, REST APIs, and automation scripts with Python, FastAPI, and Django — powering scalable server-side logic and data processing pipelines.",
  },
  {
    num: "02",
    name: "Flutter & Mobile",
    desc: "Crafting cross-platform mobile applications for iOS and Android with Flutter and Dart, delivering pixel-perfect UIs and native-like performance from a single codebase.",
  },
  {
    num: "03",
    name: "Node.js & Backend",
    desc: "Developing high-performance server applications with Node.js and Express, building real-time APIs, microservices, and event-driven architectures.",
  },
  {
    num: "04",
    name: "SQL & Databases",
    desc: "Designing efficient database schemas and complex queries across PostgreSQL, MySQL, and MongoDB — ensuring data integrity, performance, and scalability.",
  },
  {
    num: "05",
    name: "AI & Agentic Systems",
    desc: "Creating intelligent AI agents using LangChain, building RAG pipelines, multi-agent systems, and autonomous AI workflows that solve complex business problems.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Heading */}
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Skills
      </h2>

      {/* Service List */}
      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={30} duration={0.7}>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{ borderBottom: "1px solid rgba(12, 12, 12, 0.15)" }}
            >
              {/* Number */}
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {service.num}
              </span>

              {/* Name + Description */}
              <div className="flex flex-col gap-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{
                    fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                    opacity: 0.6,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
