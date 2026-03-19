import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";

type PlatformKey = "whatsapp" | "messenger" | "telegram";

const platforms: { key: PlatformKey; name: string; icon: string; color: string }[] = [
  { key: "whatsapp", name: "WhatsApp", icon: "https://cdn.simpleicons.org/whatsapp", color: "#25D366" },
  { key: "messenger", name: "Messenger", icon: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg", color: "#0084FF" },
  { key: "telegram", name: "Telegram", icon: "https://cdn.simpleicons.org/telegram", color: "#229ED9" },
];

interface ChatMsg {
  from: "client" | "ai";
  text: string;
  time: string;
}

interface Client {
  name: string;
  initials: string;
  lastMsg: string;
  time: string;
  unread: number;
  chats: Record<PlatformKey, ChatMsg[]>;
}

const clients: Client[] = [
  {
    name: "Alex Thompson", initials: "AT", lastMsg: "Thanks for the tip!", time: "10:34 AM", unread: 2,
    chats: {
      whatsapp: [
        { from: "client", text: "Hey, just got my camera delivered! 📦", time: "10:30 AM" },
        { from: "ai", text: "Awesome Alex! 🎉 Heading out to shoot this weekend?", time: "10:31 AM" },
        { from: "client", text: "Going to the coast!", time: "10:33 AM" },
        { from: "ai", text: "Nice! ☀️ Grab a polarizing filter for the water glare — want me to send options?", time: "10:34 AM" },
      ],
      messenger: [
        { from: "ai", text: "Hey Alex! 👋 Just saw your order was delivered — how's the new camera feeling?", time: "10:20 AM" },
        { from: "client", text: "It's incredible, way better than my old one", time: "10:22 AM" },
        { from: "ai", text: "Love to hear it! Did you see we just dropped a tutorial series on landscape photography? Could be perfect for your first shots 🎬", time: "10:23 AM" },
        { from: "client", text: "Oh sick, sending me the link?", time: "10:24 AM" },
        { from: "ai", text: "Here you go! Episode 3 covers golden hour — you'll love it 📸 bit.ly/landscape-series", time: "10:24 AM" },
      ],
      telegram: [
        { from: "client", text: "Quick q — is the 50mm lens compatible with the X200?", time: "10:15 AM" },
        { from: "ai", text: "Yes! Full native support, no adapter needed. It's actually one of our sharpest combos 🔥", time: "10:16 AM" },
        { from: "client", text: "Awesome. And what about the battery life with video?", time: "10:18 AM" },
        { from: "ai", text: "Around 90 mins of continuous 4K. I'd recommend the extended battery grip if you're doing longer shoots — gives you an extra 2 hours.", time: "10:19 AM" },
        { from: "client", text: "Good to know, thanks!", time: "10:20 AM" },
      ],
    },
  },
  {
    name: "Maya Chen", initials: "MC", lastMsg: "That's a lifesaver!", time: "10:28 AM", unread: 0,
    chats: {
      whatsapp: [
        { from: "ai", text: "Hi Maya! ☀️ UV index is hitting 9 in LA today — stay protected!", time: "10:25 AM" },
        { from: "client", text: "Oh wow, didn't check the weather!", time: "10:26 AM" },
        { from: "ai", text: "Since you're on retinol, your skin's extra sensitive. SPF 50 is a must today 🧴", time: "10:27 AM" },
        { from: "client", text: "That's a lifesaver!", time: "10:28 AM" },
      ],
      messenger: [
        { from: "client", text: "Hey! My subscription renews next week — can I swap the night cream for the new serum?", time: "9:50 AM" },
        { from: "ai", text: "Absolutely! The Hydra Glow Serum is a great switch. It pairs really well with your current cleanser too 💧", time: "9:51 AM" },
        { from: "client", text: "Perfect, let's do it", time: "9:52 AM" },
        { from: "ai", text: "Done! Your next box ships Monday with the serum instead. You also earned enough points for a free sample — want to add the Vitamin C mist?", time: "9:53 AM" },
        { from: "client", text: "Yes! You guys are the best 😊", time: "9:54 AM" },
      ],
      telegram: [
        { from: "client", text: "Is the retinol safe to use with AHA?", time: "8:30 AM" },
        { from: "ai", text: "Great question! I'd avoid using them on the same night — alternate days works best. AHA on Mon/Wed/Fri, retinol on Tue/Thu/Sat.", time: "8:32 AM" },
        { from: "client", text: "What about niacinamide?", time: "8:33 AM" },
        { from: "ai", text: "Niacinamide is totally safe to layer with both! Actually it helps calm any irritation from actives. Use it morning and night 👌", time: "8:34 AM" },
        { from: "client", text: "You're like a personal dermatologist haha", time: "8:35 AM" },
      ],
    },
  },
  {
    name: "James Wilson", initials: "JW", lastMsg: "Can I get a refund?", time: "9:45 AM", unread: 1,
    chats: {
      whatsapp: [
        { from: "client", text: "Hey, the item I ordered is the wrong size", time: "9:40 AM" },
        { from: "ai", text: "Sorry about that James! I've already generated a return label for you. Want to exchange for the right size or get a refund?", time: "9:41 AM" },
        { from: "client", text: "Can I get a refund?", time: "9:45 AM" },
        { from: "ai", text: "Refund initiated! You'll see it in 3-5 business days. Here's your return label 📎 No need to print — just show the QR code at any drop-off point.", time: "9:46 AM" },
      ],
      messenger: [
        { from: "client", text: "Hey is the winter sale still on?", time: "9:30 AM" },
        { from: "ai", text: "It ends tonight at midnight! 🕛 Up to 40% off outerwear. Anything specific you're eyeing?", time: "9:31 AM" },
        { from: "client", text: "The parka in navy, is it in stock in L?", time: "9:33 AM" },
        { from: "ai", text: "Last 3 in stock! It's $189 → $113 right now. Want me to hold one for you? I can reserve it for 2 hours 🔒", time: "9:34 AM" },
        { from: "client", text: "Yes hold it, checking out now!", time: "9:35 AM" },
      ],
      telegram: [
        { from: "client", text: "What's your return policy on sale items?", time: "9:20 AM" },
        { from: "ai", text: "Sale items can be returned within 14 days, unworn with tags. Full refund to original payment method.", time: "9:21 AM" },
        { from: "client", text: "Even final sale?", time: "9:22 AM" },
        { from: "ai", text: "Final sale items are exchange-only, but I can make an exception if there's a sizing issue. What's going on?", time: "9:23 AM" },
        { from: "client", text: "Jacket runs small, need to go up one size", time: "9:24 AM" },
        { from: "ai", text: "No problem — I'll set up a one-size-up exchange for you right now. Same color?", time: "9:25 AM" },
      ],
    },
  },
  {
    name: "Sara Lopez", initials: "SL", lastMsg: "Love the new collection!", time: "9:12 AM", unread: 0,
    chats: {
      whatsapp: [
        { from: "client", text: "Love the new collection! 😍", time: "9:10 AM" },
        { from: "ai", text: "Thanks Sara! 💕 The Sunset palette is our bestseller — want early access to the next drop?", time: "9:12 AM" },
      ],
      messenger: [
        { from: "ai", text: "Sara! 🎉 Your loyalty tier just upgraded to Gold! You now get free shipping + 15% off everything.", time: "9:00 AM" },
        { from: "client", text: "Wait really?? That's amazing!", time: "9:02 AM" },
        { from: "ai", text: "You've earned it! Plus, Gold members get a birthday box — yours is coming up in March. Any preferences for what goes in it? 🎁", time: "9:03 AM" },
        { from: "client", text: "Surprise me! You always pick the good stuff", time: "9:05 AM" },
      ],
      telegram: [
        { from: "client", text: "Do you ship to Mexico?", time: "8:45 AM" },
        { from: "ai", text: "We do! Standard shipping takes 7-10 days, express is 3-5. Free shipping over $75 USD 📦", time: "8:46 AM" },
        { from: "client", text: "Import duties included?", time: "8:47 AM" },
        { from: "ai", text: "Yes! We handle customs and duties at checkout — no surprise fees on delivery. The price you see is the price you pay.", time: "8:48 AM" },
        { from: "client", text: "That's rare, love it 👏", time: "8:49 AM" },
      ],
    },
  },
];

const UnifiedMessengerDemo = () => {
  const [inputText, setInputText] = useState("");
  const [activeClient, setActiveClient] = useState(0);
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("whatsapp");
  const [extraMessages, setExtraMessages] = useState<Record<string, ChatMsg[]>>({});
  const [sending, setSending] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const platformOrder: PlatformKey[] = ["whatsapp", "messenger", "telegram"];

  const startAutoLoop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActivePlatform((prev) => {
        const idx = platformOrder.indexOf(prev);
        return platformOrder[(idx + 1) % platformOrder.length];
      });
    }, 4000);
  }, []);

  useEffect(() => {
    if (!userInteracted) {
      startAutoLoop();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [userInteracted, startAutoLoop]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || sending) return;
    setSending(true);
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setInputText("");
    const key = `${activeClient}-${activePlatform}`;
    setTimeout(() => {
      setExtraMessages((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), { from: "ai" as const, text, time }],
      }));
      setSending(false);
    }, 300);
  };

  const active = clients[activeClient];
  const currentPlatform = platforms.find((p) => p.key === activePlatform)!;
  const chatKey = `${activeClient}-${activePlatform}`;
  const messages = [...active.chats[activePlatform], ...(extraMessages[chatKey] || [])];

  return (
    <div className="mt-6 rounded-xl border border-border/60 bg-secondary/30 overflow-hidden flex" style={{ height: 560 }}>
      {/* Left — Client list */}
      <div className="w-[180px] sm:w-[200px] shrink-0 border-r border-border/50 flex flex-col">
        <div className="px-3 py-2.5 border-b border-border/50">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {clients.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActiveClient(i)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${
                i === activeClient ? "bg-primary/8 border-r-2 border-primary" : "hover:bg-secondary/60"
              }`}
            >
              <div className="shrink-0">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i === activeClient ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {c.initials}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs truncate ${i === activeClient ? "font-semibold text-foreground" : "font-medium text-foreground/80"}`}>
                    {c.name}
                  </span>
                  {c.unread > 0 && (
                    <span className="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                      {c.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground truncate">{c.lastMsg}</span>
                  <span className="text-[9px] text-muted-foreground/60 shrink-0 ml-1">{c.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right — Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center gap-2.5 border-b border-border/50 px-4 py-2.5">
          <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary">
            {active.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{active.name}</p>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: currentPlatform.color }} />
              <span className="text-[10px] text-muted-foreground">via {currentPlatform.name}</span>
            </div>
          </div>
          {/* Platform toggle */}
          <div className="flex items-center gap-1.5">
            {platforms.map((p) => (
              <button
                key={p.key}
                onClick={() => { setUserInteracted(true); setActivePlatform(p.key); }}
                className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${
                  activePlatform === p.key
                    ? "opacity-100"
                    : "opacity-30 hover:opacity-50"
                }`}
              >
                <img src={p.icon} alt={p.name} className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
          {messages.map((msg, i) => (
            <motion.div
              key={`${activePlatform}-${i}`}
              className={`flex ${msg.from === "ai" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
            >
              <div
                className={`max-w-[80%] px-3 py-2 ${
                  msg.from === "ai"
                    ? "rounded-2xl rounded-br-md text-primary-foreground"
                    : "rounded-2xl rounded-bl-md bg-muted text-foreground"
                }`}
                style={msg.from === "ai" ? { backgroundColor: currentPlatform.color } : undefined}
              >
                <p className="text-[12px] leading-relaxed">{msg.text}</p>
                <div className={`mt-0.5 flex items-center gap-1 ${msg.from === "ai" ? "justify-end" : "justify-start"}`}>
                  <span className={`text-[9px] ${msg.from === "ai" ? "text-white/50" : "text-muted-foreground/60"}`}>
                    {msg.time}
                  </span>
                  {msg.from === "ai" && (
                    <Check className="h-3 w-3 text-white/50" strokeWidth={2} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border/50 p-2.5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={`Reply via ${currentPlatform.name}...`}
              className="flex-1 rounded-lg border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || sending}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: currentPlatform.color }}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedMessengerDemo;
