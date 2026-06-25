import { motion, type HTMLMotionProps } from "framer-motion";
import { type ElementType } from "react";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "as"> {
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  children: React.ReactNode;
}

export default function FadeIn({
  as: Component = "div",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  children,
  className,
  ...props
}: FadeInProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
