import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const pageVariants = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  },
  slideLeft: {
    initial: { x: 20, opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: -20, opacity: 0 },
  },
  slideRight: {
    initial: { x: -20, opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: 20, opacity: 0 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: -20, opacity: 0 },
  },
  slideDown: {
    initial: { y: -20, opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: 20, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    in: { scale: 1, opacity: 1 },
    out: { scale: 1.05, opacity: 0 },
  },
  scaleRotate: {
    initial: { scale: 0.9, rotate: -5, opacity: 0 },
    in: { scale: 1, rotate: 0, opacity: 1 },
    out: { scale: 0.9, rotate: 5, opacity: 0 },
  },
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    in: { rotateY: 0, opacity: 1 },
    out: { rotateY: -90, opacity: 0 },
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

interface PageTransitionProps {
  readonly children: ReactNode;
  readonly variant?: keyof typeof pageVariants;
  readonly className?: string;
}

export function PageTransition({
  children,
  variant = "fade",
  className = "",
}: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants[variant]}
        transition={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
