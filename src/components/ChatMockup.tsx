import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import AnimatedChatBubble, { computeTimeline } from "@/components/AnimatedChatBubble";

const messages = [
  {
    from: "ai",
    text: "Hey Alex! 👋 I noticed your new Custom X Board arrived. Are you planning to hit the slopes any time soon? I saw there's a forecast for fresh powder throughout the Alps over the next few days.",
    time: "10:32 AM",
  },
  {
    from: "customer",
    text: "I am actually planning to go to Livigno in just a few days! :) Super excited to test the new setup.",
    time: "10:33 AM",
  },
  {
    from: "ai",
    text: "Livigno is going to be epic! 🏔️ Have you already waxed your board? Not many people know, but it's especially important to wax a board before using it for the first time. I'd recommend these two for your trip:",
    time: "10:33 AM",
    showProducts: true,
  },
  {
    from: "ai",
    text: "The Fastest Wax is specifically designed for those cold, dry Alpine conditions in Livigno. If you think the weather might warm up in the afternoons, the All-Season is a safer bet!",
    time: "10:34 AM",
  },
  {
    from: "customer",
    text: "Okeey, I actually never knew that! Thanks a lot, i might order it if theres time for it to arrive before Livigno. Or maybe i just check in the local shops. Anyway, thanks for the advice!",
    time: "10:34 AM",
  },
  {
    from: "ai",
    text: "Let me know if you need any help! Have fun in Livigno :)",
    time: "10:35 AM",
  },
];

const products = [
  { name: "Burton Fastest Wax", price: "$19.95", image: "https://www.burton.com/static/product/W25/10804102000_1.png?impolicy=bglt&imwidth=358" },
  { name: "All-Season Fast Wax", price: "$14.95", image: "https://www.burton.com/static/product/W25/10810102000_1.png?impolicy=bglt&imwidth=358" },
];



const ChatMockup = () => {
  return (
    <motion.div
      className="w-full rounded-2xl border border-border/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        background: "hsla(0, 0%, 100%, 0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow:
          "0 25px 60px -12px hsla(220, 20%, 10%, 0.18), 0 8px 24px -8px hsla(220, 20%, 10%, 0.08)",
        transform: "perspective(1200px) rotateX(2deg) rotateY(-1deg)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/40 px-5 py-3.5">
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-blue-600">
            <img
              src="/burton-logo.png"
              alt="Burton logo"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background"
            style={{ backgroundColor: "hsl(142 71% 45%)" }}
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Sarah from Burton</p>
          <p className="text-xs text-muted-foreground">Online · typically replies instantly</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 p-5">
        {(() => { const timeline = computeTimeline(messages.length); return messages.map((msg, i) => (
          <AnimatedChatBubble key={i} startDelay={timeline[i]} isAI={msg.from === "ai"} align={msg.from === "customer" ? "right" : "left"}>
            {(showStatus) => (
              <div>
                <div className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[78%] px-4 py-3 ${
                      msg.from === "customer"
                        ? "bg-primary text-primary-foreground rounded-[18px] rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-[18px] rounded-bl-md"
                    }`}
                  >
                    <p className="text-[13px] leading-relaxed">{msg.text}</p>
                    <motion.div
                      className={`mt-1.5 flex items-center gap-1 ${
                        msg.from === "customer" ? "justify-end" : "justify-start"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showStatus ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className={`text-[10px] ${
                          msg.from === "customer"
                            ? "text-primary-foreground/60"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </span>
                      {msg.from === "customer" && (
                        <Check className="h-3 w-3 text-primary-foreground/60" />
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Product cards */}
                {msg.showProducts && showStatus && (
                  <motion.div
                    className="mt-2.5 ml-0 flex gap-2.5 max-w-[78%]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {products.map((product, j) => (
                      <div key={j} className="flex-1 rounded-xl border border-border/60 bg-card p-3">
                        <div className="mb-2 h-20 w-full rounded-t-xl bg-muted/50 flex items-center justify-center p-2">
                          <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                        </div>
                        <p className="text-xs font-semibold text-foreground">{product.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{product.price}</p>
                        <button className="mt-2 w-full rounded-lg bg-primary px-2 py-1.5 text-[11px] font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                          Add to Order
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </AnimatedChatBubble>
        )); })()}
      </div>

      {/* Input */}
      <div className="border-t border-border/40 px-5 py-3">
        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/50 px-4 py-2.5">
          <span className="flex-1 text-sm text-muted-foreground">Type a message...</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Send className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMockup;
