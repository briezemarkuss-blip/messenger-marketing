import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import AnimatedChatBubble, { computeTimeline } from "@/components/AnimatedChatBubble";

interface ChatMessage {
  from: "ai" | "customer";
  text: string;
  time: string;
  showProducts?: boolean;
}

interface Product {
  name: string;
  price: string;
}

interface ProactiveChatCardProps {
  brandName: string;
  agentName: string;
  avatarInitials: string;
  messages: ChatMessage[];
  products: Product[];
  theme: {
    accent: string;        // HSL for accent color
    accentForeground: string;
    userBubble: string;
    userBubbleForeground: string;
    avatarBg: string;
    avatarBorder: string;
  };
}

const ProactiveChatCard = ({
  brandName,
  agentName,
  avatarInitials,
  messages,
  products,
  theme,
}: ProactiveChatCardProps) => {
  return (
    <motion.div
      className="w-full rounded-2xl border border-border/50 overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        background: "hsla(0, 0%, 100%, 0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow:
          "0 25px 60px -12px hsla(220, 20%, 10%, 0.14), 0 8px 24px -8px hsla(220, 20%, 10%, 0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/40 px-5 py-3.5">
        <div className="relative">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
            style={{
              backgroundColor: theme.avatarBg,
              border: `2px solid ${theme.avatarBorder}`,
              color: theme.avatarBorder,
            }}
          >
            {avatarInitials}
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2"
            style={{
              backgroundColor: "hsl(142 71% 45%)",
              borderColor: "hsl(0 0% 100%)",
            }}
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            {agentName} from {brandName}
          </p>
          <p className="text-xs text-muted-foreground">Online · typically replies instantly</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 p-5 overflow-y-auto" style={{ height: 420 }}>
        {(() => { const timeline = computeTimeline(messages.length); return messages.map((msg, i) => (
          <AnimatedChatBubble key={i} startDelay={timeline[i]} isAI={msg.from === "ai"} align={msg.from === "customer" ? "right" : "left"}>
            {(showStatus) => (
              <div>
                <div className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[80%] px-4 py-3"
                    style={{
                      borderRadius:
                        msg.from === "customer"
                          ? "18px 18px 6px 18px"
                          : "18px 18px 18px 6px",
                      backgroundColor:
                        msg.from === "customer" ? theme.userBubble : "hsl(var(--secondary))",
                      color:
                        msg.from === "customer"
                          ? theme.userBubbleForeground
                          : "hsl(var(--secondary-foreground))",
                    }}
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
                        className="text-[10px]"
                        style={{
                          opacity: 0.6,
                          color:
                            msg.from === "customer"
                              ? theme.userBubbleForeground
                              : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {msg.time}
                      </span>
                      {msg.from === "customer" && (
                        <Check
                          className="h-3 w-3"
                          style={{ opacity: 0.6, color: theme.userBubbleForeground }}
                        />
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Product cards */}
                {msg.showProducts && showStatus && (
                  <motion.div
                    className="mt-2.5 ml-0 flex gap-2.5 max-w-[80%]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {products.map((product, j) => (
                      <div key={j} className="flex-1 rounded-xl border border-border/60 bg-card p-3">
                        <div className="mb-2 h-16 w-full rounded-lg bg-muted/50 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground font-medium">{product.name}</span>
                        </div>
                        <p className="text-xs font-semibold text-foreground">{product.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{product.price}</p>
                        <button
                          className="mt-2 w-full rounded-lg px-2 py-1.5 text-[11px] font-medium transition-opacity hover:opacity-80"
                          style={{ backgroundColor: theme.accent, color: theme.accentForeground }}
                        >
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
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.accent }}
          >
            <Send className="h-3.5 w-3.5" style={{ color: theme.accentForeground }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProactiveChatCard;
