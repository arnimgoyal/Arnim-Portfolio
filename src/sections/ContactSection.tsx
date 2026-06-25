import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeIn from "@/components/FadeIn";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Submission extends FormData {
  id: string;
  timestamp: string;
}

const customEase = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      const stored = localStorage.getItem("portfolio_contacts");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a brief delay for UX polish
    setTimeout(() => {
      const newSubmission: Submission = {
        ...formData,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };

      const updated = [...submissions, newSubmission];
      setSubmissions(updated);

      // Save to localStorage as JSON
      localStorage.setItem("portfolio_contacts", JSON.stringify(updated));

      // Log to console for visibility
      console.log("📩 New contact submission:", newSubmission);
      console.log("📋 All submissions (JSON):", JSON.stringify(updated, null, 2));

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-10 sm:py-12 md:py-16 overflow-hidden"
    >
      {/* Decorative gradient circle - top right */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(118, 33, 176, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Decorative gradient circle - bottom left */}
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(182, 0, 168, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="flex flex-col flex-1 justify-center max-w-4xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.9}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" }}
          >
            Contact
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20} duration={0.7}>
          <p
            className="text-center font-light mx-auto mb-8 sm:mb-10"
            style={{
              color: "rgba(12, 12, 12, 0.55)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            }}
          >
            Have a project in mind or want to collaborate? Drop me a message and
            I'll get back to you as soon as possible.
          </p>
        </FadeIn>

        {/* Form Container */}
        <div className="w-full relative z-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15, ease: customEase }}
                  className="flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="contact-name"
                    className="text-[#0C0C0C] font-medium uppercase tracking-widest text-[10px] sm:text-xs"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent text-[#0C0C0C] font-light text-sm sm:text-base py-2 border-b-2 border-[#0C0C0C]/15 focus:border-[#7621B0] outline-none transition-colors duration-300 placeholder:text-[#0C0C0C]/25"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
                  className="flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="contact-email"
                    className="text-[#0C0C0C] font-medium uppercase tracking-widest text-[10px] sm:text-xs"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent text-[#0C0C0C] font-light text-sm sm:text-base py-2 border-b-2 border-[#0C0C0C]/15 focus:border-[#7621B0] outline-none transition-colors duration-300 placeholder:text-[#0C0C0C]/25"
                  />
                </motion.div>
              </div>

              {/* Subject */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25, ease: customEase }}
                className="flex flex-col gap-1.5"
              >
                <label
                  htmlFor="contact-subject"
                  className="text-[#0C0C0C] font-medium uppercase tracking-widest text-[10px] sm:text-xs"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full bg-transparent text-[#0C0C0C] font-light text-sm sm:text-base py-2 border-b-2 border-[#0C0C0C]/15 focus:border-[#7621B0] outline-none transition-colors duration-300 placeholder:text-[#0C0C0C]/25"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
                className="flex flex-col gap-1.5"
              >
                <label
                  htmlFor="contact-message"
                  className="text-[#0C0C0C] font-medium uppercase tracking-widest text-[10px] sm:text-xs"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent text-[#0C0C0C] font-light text-sm sm:text-base py-2 border-b-2 border-[#0C0C0C]/15 focus:border-[#7621B0] outline-none transition-colors duration-300 placeholder:text-[#0C0C0C]/25 resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35, ease: customEase }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative rounded-full font-medium uppercase tracking-widest text-white text-xs sm:text-sm px-8 py-3 sm:px-10 sm:py-3.5 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100 w-full sm:w-auto"
                  style={{
                    background:
                      "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                    boxShadow:
                      "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1, 0 0 0 2px white",
                  }}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </motion.div>
            </div>
          </form>

          {/* Success Toast */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={
              isSubmitted
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 20, scale: 0.95 }
            }
            transition={{ duration: 0.4, ease: customEase }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div
              className="flex items-center gap-3 px-6 py-4 rounded-2xl text-white font-medium text-sm shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #18011F 0%, #7621B0 100%)",
                boxShadow: "0 20px 60px rgba(118, 33, 176, 0.35)",
              }}
            >
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Message sent successfully!
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-[#0C0C0C]/10 pt-4 mt-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <p
            className="font-medium text-[#0C0C0C] text-xs sm:text-sm text-center"
            style={{ opacity: 0.4 }}
          >
            © {new Date().getFullYear()} Arnim Goyal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/arnimgoyal"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#0C0C0C] text-xs sm:text-sm hover:text-[#7621B0] transition-colors duration-300"
              style={{ opacity: 0.6 }}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/arnim-goyal"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#0C0C0C] text-xs sm:text-sm hover:text-[#7621B0] transition-colors duration-300"
              style={{ opacity: 0.6 }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
