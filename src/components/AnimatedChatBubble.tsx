import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Typing indicator (three pulsing dots) ──────────────── */

export const TypingIndicator = ({
  bgColor = "#E4E6EB",
  dotColor = "#65676B",
  borderRadius = "18px",
}: {
  bgColor?: string;
  dotColor?: string;
  borderRadius?: string;
}) => (
  <div
    className="inline-flex items-center gap-1.5 px-4 py-3"
    style={{ backgroundColor: bgColor, borderRadius }}
  >
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="block h-[7px] w-[7px] rounded-full"
        style={{ backgroundColor: dotColor }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

/* ── Timeline constants ─────────────────────────────────── */

const TYPING_MS = 2000;
const STATUS_DELAY_MS = 500;
const GAP_MS = 1000;

/**
 * Compute the absolute start time (ms) for each message in a strict sequence.
 *
 * Per message:  typing(2s) → reveal → status(+0.5s) → gap(1s) → next
 * Total per message slot = TYPING + STATUS_DELAY + GAP = 3500ms
 * (last message omits the gap)
 */
export function computeTimeline(count: number): number[] {
  const SLOT = TYPING_MS + STATUS_DELAY_MS + GAP_MS; // 3500
  return Array.from({ length: count }, (_, i) => i * SLOT);
}

/* ── Animated wrapper for a single chat bubble ──────────── */

export interface AnimatedChatBubbleProps {
  /** Render prop: receives `showStatus` to conditionally reveal timestamps/checkmarks */
  children: (showStatus: boolean) => React.ReactNode;
  /** Absolute start delay in ms (from viewport entry) */
  startDelay: number;
  /** Whether this is an AI / grey bubble (shows typing) */
  isAI: boolean;
  /** Typing indicator colors */
  typingBgColor?: string;
  typingDotColor?: string;
  typingBorderRadius?: string;
  /** Alignment for the typing indicator */
  align?: "left" | "right";
}

const AnimatedChatBubble = ({
  children,
  startDelay,
  isAI,
  typingBgColor,
  typingDotColor,
  typingBorderRadius,
  align = "left",
}: AnimatedChatBubbleProps) => {
  type Phase = "hidden" | "typing" | "message" | "status";
  const [phase, setPhase] = useState<Phase>("hidden");
  const [entered, setEntered] = useState(false);

  const onEnter = useCallback(() => {
    if (!entered) setEntered(true);
  }, [entered]);

  useEffect(() => {
    if (!entered) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // → typing
    timers.push(setTimeout(() => setPhase("typing"), startDelay));

    // → message revealed
    timers.push(setTimeout(() => setPhase("message"), startDelay + TYPING_MS));

    // → status visible
    timers.push(
      setTimeout(() => setPhase("status"), startDelay + TYPING_MS + STATUS_DELAY_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, [entered, startDelay]);

  const showStatus = phase === "status";

  return (
    <motion.div
      onViewportEnter={onEnter}
      viewport={{ once: true, amount: 0.05 }}
      /* reserve space so nothing jumps — start invisible */
      initial={{ opacity: 0, y: 16 }}
      animate={
        phase !== "hidden"
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16 }
      }
      transition={{ duration: 0.45, ease: [0, 0, 0.2, 1] }}
    >
      <AnimatePresence mode="wait">
        {phase === "typing" ? (
          <motion.div
            key="typing"
            className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
          >
            <TypingIndicator
              bgColor={typingBgColor}
              dotColor={typingDotColor}
              borderRadius={typingBorderRadius}
            />
          </motion.div>
        ) : phase === "message" || phase === "status" ? (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {children(showStatus)}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedChatBubble;
