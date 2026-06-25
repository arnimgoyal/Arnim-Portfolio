import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WordsPullUpProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function WordsPullUp({
  children,
  className = "",
  staggerDelay = 0.08,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Extract text content from children
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </div>
  );
}
