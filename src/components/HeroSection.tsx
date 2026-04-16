import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import HeroChatCarousel from "@/components/HeroChatCarousel";
import QuoteDialog from "./QuoteDialog";

const wordAnim = (i: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
});

const TYPEWRITER_PHRASES = [
  "An AI that speaks human, learns and adapts.",
  "Request access to set up this system for your business.",
  "Proven to drive 3x higher conversion rates than traditional email marketing.",
];
const TYPEWRITER_START = 1.4;
const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const PAUSE_AFTER_TYPE = 2500;
const PAUSE_AFTER_DELETE = 500;

const HeroSection = () => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

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

  return (
    <section className="relative overflow-hidden px-4 pt-28 sm:pt-24 lg:px-8 lg:pt-52 pb-16 sm:pb-20">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.1),rgba(255,255,255,0))]" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 max-w-xl -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          {/* Desktop headlines */}
          <div className="hidden lg:block">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground lg:text-6xl xl:text-7xl" style={{ letterSpacing: "-0.04em" }}>
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

            <h1 className="text-5xl font-extrabold tracking-tight text-foreground lg:text-6xl xl:text-7xl mt-1" style={{ letterSpacing: "-0.04em" }}>
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

          {/* Mobile/tablet headlines — bold typographic poster */}
          <div className="lg:hidden" style={{ letterSpacing: "-0.05em" }}>
            <h1 className="text-[2.75rem] sm:text-6xl font-black text-foreground leading-[0.9]">
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

            <h1 className="text-[2.75rem] sm:text-6xl font-black text-foreground leading-[0.9] mt-6 sm:mt-8">
              {[
                { text: "Get 90%", highlight: true, idx: 3 },
                { text: "Open Rates", highlight: true, idx: 4 },
                { text: "via Messenger.", highlight: true, idx: 5 },
              ].map(({ text, highlight, idx }) => (
                <motion.span key={idx} className={`block ${highlight ? "text-primary" : ""}`} {...wordAnim(idx)}>
                  {text}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtext — "Context" */}
          <motion.div
            className="mx-auto pt-12 sm:pt-14 max-w-3xl text-center text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-0 leading-relaxed">
              <p>
                Harness{" "}
                <Badge variant="secondary" className="inline-flex items-center gap-1 align-middle mx-0.5 font-semibold text-foreground text-sm">
                  <img src="https://cdn.simpleicons.org/whatsapp" alt="" className="h-3.5 w-3.5" />WhatsApp
                </Badge>,{" "}
                <Badge variant="secondary" className="inline-flex items-center gap-1 align-middle mx-0.5 font-semibold text-foreground text-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="" className="h-3.5 w-3.5" />Messenger
                </Badge>, and{" "}
                <Badge variant="secondary" className="inline-flex items-center gap-1 align-middle mx-0.5 font-semibold text-foreground text-sm">
                  <img src="https://cdn.simpleicons.org/telegram" alt="" className="h-3.5 w-3.5" />Telegram
                </Badge>{" "}
                to recover{" "}
                <Badge variant="default" className="inline-flex align-middle mx-0.5 font-bold italic text-sm">
                  3x more
                </Badge>{" "}
                abandoned carts than email alone.
              </p>
            </div>
          </motion.div>


          <motion.div className="mt-4 flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}>
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
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuoteDialog>
              <Button size="lg" className="rounded-full px-7 text-[15px] font-semibold shadow-sm bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-200">
                Request access
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
