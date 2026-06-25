import { useRef, useState, useCallback, type ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");
  const [transition, setTransition] = useState("transform 0.6s ease-in-out");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const isActive =
        e.clientX > rect.left - padding &&
        e.clientX < rect.right + padding &&
        e.clientY > rect.top - padding &&
        e.clientY < rect.bottom + padding;

      if (isActive) {
        const deltaX = (e.clientX - centerX) / strength;
        const deltaY = (e.clientY - centerY) / strength;
        setTransform(`translate3d(${deltaX}px, ${deltaY}px, 0)`);
        setTransition("transform 0.3s ease-out");
      } else {
        setTransform("translate3d(0, 0, 0)");
        setTransition("transform 0.6s ease-in-out");
      }
    },
    [padding, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("translate3d(0, 0, 0)");
    setTransition("transform 0.6s ease-in-out");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition, willChange: "transform" }}
      className={className}
    >
      {children}
    </div>
  );
}
