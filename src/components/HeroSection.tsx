/* refreshed v2 */
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroChatCarousel from "@/components/HeroChatCarousel";
import { Separator } from "@/components/ui/separator";
import QuoteDialog from "./QuoteDialog";

const wordAnim = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: i * 0.375, ease: [0.42, 0, 0.58, 1] as const },
});

const TYPEWRITER_PHRASES = [
  "An AI that speaks human, learns and adapts.",
  "Get a free quote to set up this system for your business.",
  "Proven to drive 3x higher conversion rates than traditional email marketing.",
];
const TYPEWRITER_START = 3.3;
const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const PAUSE_AFTER_TYPE = 2500;
const PAUSE_AFTER_DELETE = 500;

const HeroSection = () => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [typeWidth, setTypeWidth] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await sleep(TYPEWRITER_START * 1000);
      if (cancelled) return;
      setShowCursor(true);

      let phraseIdx = 0;
      while (!cancelled) {
        const phrase = TYPEWRITER_PHRASES[phraseIdx];
        setCurrentPhraseIdx(phraseIdx);
        // Type forward
        for (let i = 1; i <= phrase.length; i++) {
          if (cancelled) return;
          setDisplayedCount(i);
          await sleep(TYPE_SPEED);
        }
        await sleep(PAUSE_AFTER_TYPE);
        // Delete backward
        for (let i = phrase.length - 1; i >= 0; i--) {
          if (cancelled) return;
          setDisplayedCount(i);
          await sleep(DELETE_SPEED);
        }
        await sleep(PAUSE_AFTER_DELETE);
        phraseIdx = (phraseIdx + 1) % TYPEWRITER_PHRASES.length;
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (measureRef.current) {
      setTypeWidth(measureRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pt-24 sm:pt-20 lg:px-8 lg:pt-56 pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          {/* Desktop headlines */}
          <div className="hidden sm:block">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl whitespace-nowrap" style={{ letterSpacing: "-0.04em" }}>
              {[
                { word: "Stop", highlight: false },
                { word: "Being", highlight: false },
                { word: "Ignored", highlight: false },
                { word: "in", highlight: false },
                { word: "the", highlight: false },
                { word: "Inbox.", highlight: false },
              ].map(({ word, highlight }, i) => (
                <motion.span key={i} className={`inline-block mr-[0.25em] ${highlight ? "text-primary" : ""}`} {...wordAnim(i)}>
                  {word}
                </motion.span>
              ))}
            </h1>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl mt-1 whitespace-nowrap" style={{ letterSpacing: "-0.04em" }}>
              {[
                { word: "Get", highlight: false },
                { word: "90%", highlight: true },
                { word: "Open", highlight: true },
                { word: "Rates", highlight: true },
                { word: "via", highlight: true },
                { word: "Messenger.", highlight: true },
              ].map(({ word, highlight }, i) => (
                <motion.span key={i} className={`inline-block mr-[0.25em] ${highlight ? "text-primary" : ""}`} {...wordAnim(i + 6)}>
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Mobile headlines — bold typographic poster */}
          <div className="sm:hidden" style={{ letterSpacing: "-0.05em" }}>
            <h1 className="text-5xl font-black text-foreground leading-[0.9]">
              {[
                { text: "Stop Being", highlight: false, idx: 0 },
                { text: "Ignored in", highlight: false, idx: 1 },
                { text: "the Inbox.", highlight: false, idx: 2 },
              ].map(({ text, highlight, idx }) => (
                <motion.span key={idx} className={`block ${highlight ? "text-primary" : ""}`} {...wordAnim(idx)}>
                  {text}
                </motion.span>
              ))}
            </h1>

            <h1 className="text-5xl font-black text-foreground leading-[0.9] mt-8">
              {[
                { text: "Get 90%", highlight: true, idx: 3 },
                { text: "Open Rates", highlight: true, idx: 4 },
                { text: "via", highlight: true, idx: 5 },
                { text: "Messenger.", highlight: true, idx: 6 },
              ].map(({ text, highlight, idx }) => (
                <motion.span key={idx} className={`block ${highlight ? "text-primary" : ""}`} {...wordAnim(idx)}>
                  {text}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtext — "Context" */}
          <motion.div
            className="mx-auto pt-10 sm:pt-14 max-w-3xl text-center text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: [0.42, 0, 0.58, 1] }}
          >
            <div className="space-y-0 leading-relaxed">
              <p>
                Harness{" "}
                <span className="inline-flex items-baseline whitespace-nowrap"><img src="https://cdn.simpleicons.org/whatsapp" alt="" className="inline h-5 w-5 align-text-bottom mx-0.5 mr-1.5" /><span className="font-semibold text-foreground">WhatsApp</span></span>,{" "}
                <span className="inline-flex items-baseline whitespace-nowrap"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="" className="inline h-5 w-5 align-text-bottom mx-0.5 mr-1.5" /><span className="font-semibold text-foreground">Messenger</span></span>, and{" "}
                <span className="inline-flex items-baseline whitespace-nowrap"><img src="https://cdn.simpleicons.org/telegram" alt="" className="inline h-5 w-5 align-text-bottom mx-0.5 mr-1.5" /><span className="font-semibold text-foreground">Telegram</span></span> to recover <span className="text-primary font-bold italic underline decoration-primary/30">3x more</span> abandoned carts than email alone.
              </p>
            </div>
          </motion.div>


          <motion.div className="mt-4 flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.5, ease: [0.42, 0, 0.58, 1] }}>
            <div className="max-w-2xl w-full">
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg min-h-[3rem] sm:min-h-[1.75rem] text-center relative flex items-center justify-center">
                {/* Invisible holder to ensure enough space for the longest phrase */}
                <span className="invisible h-0 overflow-hidden">
                  {TYPEWRITER_PHRASES.reduce((a, b) => a.length > b.length ? a : b)}
                </span>
                {/* Visible typed portion overlaid */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span>
                    <span>{TYPEWRITER_PHRASES[currentPhraseIdx].slice(0, displayedCount)}</span>
                    {showCursor && <span className="inline-block w-[2px] h-[1.1em] bg-foreground ml-0.5 align-text-bottom animate-[blink_1s_step-end_infinite]" />}
                    <span className="invisible">{TYPEWRITER_PHRASES[currentPhraseIdx].slice(displayedCount)}</span>
                  </span>
                </span>
              </h3>
            </div>
          </motion.div>

          {/* CTAs — "Action" */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: [0.42, 0, 0.58, 1] }}
          >
            <QuoteDialog>
              <Button size="lg" className="rounded-full px-7 text-[15px] font-semibold shadow-sm bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-200">
                Get a free quote
              </Button>
            </QuoteDialog>
          </motion.div>

          <div className="flex justify-center pt-16 pb-24 sm:pt-24 sm:pb-32">
            <Separator className="w-1/2 max-w-2xl opacity-20" />
          </div>

          {/* Chat Carousel — "Proof" */}
          <div className="max-sm:snap-start scroll-mt-20">
            <HeroChatCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
