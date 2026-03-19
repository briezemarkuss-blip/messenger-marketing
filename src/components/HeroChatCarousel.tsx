/* v3 – platform-specific chat UIs */
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, CheckCheck, Send, ThumbsUp, Camera, Phone, Video, MoreVertical, Search, Paperclip, Smile, Mic } from "lucide-react";
import AnimatedChatBubble, { computeTimeline } from "@/components/AnimatedChatBubble";

/* ── types ───────────────────────────────────────────────── */

interface Msg {
  from: "ai" | "customer";
  text: string;
  time: string;
  showProducts?: boolean;
}

interface Product {
  name: string;
  price: string;
  image?: string;
}

type Platform = "messenger" | "telegram" | "whatsapp";

interface Slide {
  brand: string;
  agent: string;
  avatarInitials: string;
  avatarImage?: string;
  platform: Platform;
  messages: Msg[];
  products: Product[];
}

/* ── data ────────────────────────────────────────────────── */

const slides: Slide[] = [
{
  brand: "Burton",
  agent: "James",
  avatarInitials: "B",
  avatarImage: "/burton-logo.png",
  platform: "messenger",
  messages: [
  { from: "ai", text: "Hey Alex! 👋 I noticed your new Custom X Board arrived. Are you planning to hit the slopes any time soon? I saw there's a forecast for fresh powder throughout the Alps over the next few days.", time: "10:32 AM" },
  { from: "customer", text: "I am actually planning to go to Livigno in just a few days! :) Super excited to test the new setup.", time: "10:33 AM" },
  { from: "ai", text: "Livigno is going to be epic! 🏔️ Have you already waxed your board? Not many people know, but it's especially important to wax a board before using it for the first time. I'd recommend these two for your trip:", time: "10:33 AM", showProducts: true },
  { from: "ai", text: "The Fastest Wax is specifically designed for those cold, dry Alpine conditions in Livigno. If you think the weather might warm up in the afternoons, the All-Season is a safer bet!", time: "10:34 AM" },
  { from: "customer", text: "Okeey, I actually never knew that! Thanks a lot, i might order it if theres time for it to arrive before Livigno. Or maybe i just check in the local shops. Anyway, thanks for the advice!", time: "10:34 AM" },
  { from: "ai", text: "Let me know if you need any help! Have fun in Livigno :)", time: "10:35 AM" }],

  products: [
  { name: "Burton Fastest Wax", price: "$19.95", image: "https://www.burton.com/static/product/W25/10804102000_1.png?impolicy=bglt&imwidth=358" },
  { name: "All-Season Fast Wax", price: "$14.95", image: "https://www.burton.com/static/product/W25/10810102000_1.png?impolicy=bglt&imwidth=358" }]

},
{
  brand: "Apex Tech",
  agent: "Sarah",
  avatarInitials: "AT",
  avatarImage: "/apex-logo.png",
  platform: "telegram",
  messages: [
  { from: "ai", text: "Hey Alex! 👋 I saw your new Mirrorless Camera arrived. Are you planning any trips soon? The weather looks bright this weekend for outdoor shots.", time: "10:34 AM" },
  { from: "customer", text: "I am actually heading to the coast! Super excited to test it out.", time: "10:35 AM" },
  { from: "ai", text: "The coast will be amazing! ☀️ Have you considered a polarizing filter? It's essential for cutting glare. I'd recommend these:", time: "10:35 AM", showProducts: true },
  { from: "customer", text: "Oh, I didn't think of that! Thanks for the tip!", time: "10:36 AM" }],

  products: [
  { name: "Circular Polarizer", price: "$49.00" },
  { name: "Lens Pen", price: "$15.00" }]

},
{
  brand: "Glow Lab",
  agent: "Sophie",
  avatarInitials: "GL",
  avatarImage: "/glow-logo.png",
  platform: "whatsapp",
  messages: [
  { from: "ai", text: "Hi Maya! ☀️ I noticed a heatwave is hitting Los Angeles this week. The UV index is reaching a level 9.", time: "10:34 AM" },
  { from: "customer", text: "Oh wow, I didn't even check the weather! I was just planning to go for a run.", time: "10:35 AM" },
  { from: "ai", text: "Since you're using our Retinol Serum at night, your skin is more sensitive. I'd recommend these for your run:", time: "10:35 AM", showProducts: true },
  { from: "customer", text: "That's a lifesaver. Add the SPF to my order, please!", time: "10:36 AM" }],

  products: [
  { name: "Mineral SPF 50+", price: "$24.00" },
  { name: "Cooling Mist", price: "$18.00" }]

},
{
  brand: "Zorro",
  agent: "Alise",
  avatarInitials: "Z",
  avatarImage: "/zorro-logo.webp",
  platform: "whatsapp",
  messages: [
  { from: "ai", text: "Hi Melanie! 👋 Alise here from Zorro. We're checking in with customers who haven't shopped with us in a while. Last time you bought THE LITTLE LION for your kittens. How did they like it?", time: "11:10 AM" },
  { from: "customer", text: "Hi! Unfortunately, they didn't really like that one. But I'm still buying other Essential products from Barfus.", time: "11:11 AM" },
  { from: "ai", text: "Thanks for sharing! Sorry to hear, but great you choose Essential. We have a special offer for returning customers — a discount on your next purchase! Want to see some treats they might enjoy?", time: "11:11 AM" },
  { from: "customer", text: "Thanks, I'd love to see the offer! ❤️", time: "11:12 AM" },
  { from: "ai", text: "Awesome! To find the best fit, do they prefer dry or wet food? And for treats — natural dried items, or more crunchy/paste-like ones?", time: "11:12 AM" },
  { from: "customer", text: "Both cats eat raw food and Essential Jaguar dry. For treats, they prefer paste-like ones, but we haven't tried many varieties.", time: "11:13 AM" },
  { from: "ai", text: "I found some great options! 🐾 Since they love raw food, I'd also recommend our Kitty Beat duck cubes or tuna flakes. They are 100% natural and grain-free!", time: "11:13 AM" },
  { from: "customer", text: "Thanks, we don't use canned food, and we have enough dry food for now.", time: "11:14 AM" },
  { from: "ai", text: "No problem! In that case, these treats are perfect: Kitty Beat duck cubes, Kitty's Farm tuna flakes, and Essential dried fish. Plus, use code JULY5 for 5% off! 🐾", time: "11:14 AM", showProducts: true },
  { from: "customer", text: "Thanks a lot for the help! I'll definitely check those out. ❤️", time: "11:15 AM" },
  { from: "ai", text: "You're very welcome! Happy to help you and your cats. Have a great day! 😊", time: "11:15 AM" }],
  
  products: [
  { name: "Kitty Beat – Duck Breast", price: "€8.50" },
  { name: "Kitty’s Farm – Tuna Flakes", price: "€5.00" },
  { name: "Essential Fish Treats", price: "€5.00" }]

},
{
  brand: "Wanderly",
  agent: "Luca",
  avatarInitials: "WD",
  avatarImage: "/wanderly-logo.png",
  platform: "telegram",
  messages: [
  { from: "ai", text: "Hey Emma! ✈️ I saw you've been browsing weekend getaways. There are some amazing last-minute deals for this Friday — want me to show you a few?", time: "2:15 PM" },
  { from: "customer", text: "Yes please! Somewhere warm with a beach would be ideal 🏖️", time: "2:16 PM" },
  { from: "ai", text: "I've got just the thing! Here are two top picks with availability this weekend:", time: "2:16 PM", showProducts: true },
  { from: "customer", text: "The Crete one looks amazing! Can you hold that for me while I check with my partner?", time: "2:17 PM" },
  { from: "ai", text: "Done! I've reserved it for 2 hours. Just let me know and I'll finalize the booking 😊", time: "2:17 PM" }],

  products: [
  { name: "Crete Beach Resort 3N", price: "$389.00" },
  { name: "Algarve Coastal Villa 3N", price: "$425.00" }]

},
{
  brand: "HomeNest",
  agent: "James",
  avatarInitials: "HN",
  avatarImage: "/homenest-logo.png",
  platform: "messenger",
  messages: [
  { from: "ai", text: "Hi Rachel! 🏡 I noticed you saved a few listings in Brooklyn Heights last week. A new 2-bedroom just came on the market today — matches your criteria perfectly.", time: "9:20 AM" },
  { from: "customer", text: "Oh really? What's the asking price?", time: "9:21 AM" },
  { from: "ai", text: "$3,200/mo, pet-friendly, with in-unit laundry. It's a renovated brownstone. Here's a quick look:", time: "9:21 AM", showProducts: true },
  { from: "customer", text: "That looks great! Can we schedule a tour this Saturday?", time: "9:22 AM" },
  { from: "ai", text: "You're booked for Saturday at 11 AM! I'll send you the address and prep notes beforehand 📋", time: "9:22 AM" }],

  products: [
  { name: "Brownstone 2BR", price: "$3,200/mo" },
  { name: "Loft Studio", price: "$2,100/mo" }]

},
{
  brand: "FitPulse",
  agent: "Mia",
  avatarInitials: "FP",
  avatarImage: "/fitpulse-logo.png",
  platform: "whatsapp",
  messages: [
  { from: "ai", text: "Hey Tom! 💪 Great job hitting 12 sessions this month! You're on a streak. Have you thought about trying our new HIIT classes?", time: "3:45 PM" },
  { from: "customer", text: "I've been curious about those! When do they run?", time: "3:46 PM" },
  { from: "ai", text: "We have morning slots at 6:30 AM and evening at 7 PM, Mon/Wed/Fri. Since you're on the Basic plan, here's what I'd recommend:", time: "3:46 PM", showProducts: true },
  { from: "customer", text: "The Pro plan looks worth it. Can I upgrade right now?", time: "3:47 PM" },
  { from: "ai", text: "Done! You're now on Pro 🎉 Your first HIIT class is booked for Monday at 7 PM. See you there!", time: "3:47 PM" }],

  products: [
  { name: "Pro Membership", price: "$59/mo" },
  { name: "10-Class HIIT Pack", price: "$45.00" }]

}];


/* ── wallpaper backgrounds (CSS background-image for full scroll coverage) ── */

const telegramBgSvg = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><path d="M10 30 L25 25 L20 35 Z" fill="#7EA6BE" opacity="0.15"/><circle cx="60" cy="20" r="6" fill="none" stroke="#7EA6BE" stroke-width="1.5" opacity="0.15"/><path d="M90 15 Q95 10 100 15 Q105 20 100 25 Q95 30 90 25 Q85 20 90 15Z" fill="none" stroke="#7EA6BE" stroke-width="1.5" opacity="0.15"/><path d="M30 70 L33 63 L36 70 L43 70 L38 75 L40 82 L33 78 L26 82 L28 75 L23 70Z" fill="#7EA6BE" opacity="0.1"/><path d="M75 65 Q72 58 78 56 Q84 54 86 60 Q92 58 93 64 Q95 70 88 72 L76 72 Q70 72 72 67Z" fill="none" stroke="#7EA6BE" stroke-width="1.2" opacity="0.15"/><rect x="55" y="90" width="16" height="12" rx="2" fill="none" stroke="#7EA6BE" stroke-width="1.2" opacity="0.15"/><circle cx="63" cy="96" r="3.5" fill="none" stroke="#7EA6BE" stroke-width="1.2" opacity="0.15"/><path d="M10 95 Q10 88 17 88 L25 88 Q32 88 32 95 L32 100 Q32 107 25 107 L18 107 L12 112 L14 107 Q10 107 10 100Z" fill="none" stroke="#7EA6BE" stroke-width="1.2" opacity="0.15"/><path d="M100 85 L100 100 M100 85 L110 83 L110 98" fill="none" stroke="#7EA6BE" stroke-width="1.2" opacity="0.15"/><circle cx="97" cy="100" r="3" fill="none" stroke="#7EA6BE" stroke-width="1.2" opacity="0.15"/><circle cx="107" cy="98" r="3" fill="none" stroke="#7EA6BE" stroke-width="1.2" opacity="0.15"/></svg>`)}")`;

const telegramBgStyle: React.CSSProperties = {
  backgroundColor: "#C8D9E6",
  backgroundImage: telegramBgSvg,
  backgroundRepeat: "repeat",
};

const whatsappBgSvg = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><path d="M15 20 L20 12 L25 20 Z" fill="#B8A99A" opacity="0.08"/><circle cx="55" cy="18" r="5" fill="none" stroke="#B8A99A" stroke-width="1.5" opacity="0.08"/><rect x="80" y="12" width="10" height="14" rx="2" fill="none" stroke="#B8A99A" stroke-width="1.2" opacity="0.08"/><path d="M10 55 Q10 48 17 48 L27 48 Q34 48 34 55 L34 60 Q34 67 27 67 L18 67 L13 72 L15 67 Q10 66 10 60Z" fill="none" stroke="#B8A99A" stroke-width="1.2" opacity="0.08"/><path d="M60 50 L63 43 L66 50 L73 50 L68 55 L70 62 L63 58 L56 62 L58 55 L53 50Z" fill="#B8A99A" opacity="0.06"/><path d="M85 55 Q82 48 88 46 Q94 44 96 50 Q102 48 103 54 Q105 60 98 62 L86 62 Q80 62 82 57Z" fill="none" stroke="#B8A99A" stroke-width="1.2" opacity="0.08"/><circle cx="25" cy="85" r="7" fill="none" stroke="#B8A99A" stroke-width="1.2" opacity="0.08"/><path d="M22 85 L25 82 L28 85" fill="none" stroke="#B8A99A" stroke-width="1.2" opacity="0.08"/><path d="M65 80 L65 95 M65 80 L75 78 L75 93" fill="none" stroke="#B8A99A" stroke-width="1.2" opacity="0.08"/><circle cx="62" cy="95" r="3" fill="none" stroke="#B8A99A" stroke-width="1.2" opacity="0.08"/><circle cx="72" cy="93" r="3" fill="none" stroke="#B8A99A" stroke-width="1.2" opacity="0.08"/></svg>`)}")`;

const whatsappBgStyle: React.CSSProperties = {
  backgroundColor: "#E5DDD5",
  backgroundImage: whatsappBgSvg,
  backgroundRepeat: "repeat",
};


/* ── Messenger card (clean generic style) ────────────────── */

const MessengerCard = ({ slide }: {slide: Slide;}) => {
  const { messages, products } = slide;

  return (
    <div
      className="w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        boxShadow: "0 25px 60px -12px hsla(220, 20%, 10%, 0.15), 0 12px 30px -8px hsla(220, 20%, 10%, 0.08)",
        transform: "perspective(1200px) rotateX(2deg) rotateY(-1deg)"
      }}>
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: "#F0F0F0" }}>
        <div className="relative">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full overflow-hidden shrink-0 ${slide.avatarImage ? "bg-white" : "bg-gray-100"}`}>
              {slide.avatarImage ? (
                <img src={slide.avatarImage} alt={slide.brand} className="w-full h-full object-contain p-1" />
              ) : (
                <span className="text-xs font-bold" style={{ color: "#65676B" }}>{slide.avatarInitials}</span>
              )}
            </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white" style={{ backgroundColor: "#31A24C" }} />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: "#050505" }}>{slide.agent} from {slide.brand}</p>
          <p className="text-[11px]" style={{ color: "#65676B" }}>Online · typically replies instantly</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-4 p-5 h-[420px] overflow-y-auto" style={{ backgroundColor: "#ffffff" }}>
        {(() => {const timeline = computeTimeline(messages.length);return messages.map((msg, i) =>
          <AnimatedChatBubble key={i} startDelay={timeline[i]} isAI={msg.from === "ai"} align={msg.from === "customer" ? "right" : "left"} typingBgColor="#F0F2F5" typingDotColor="#65676B">
            {(showStatus) =>
            <div>
                <div className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
                  <div
                  className="max-w-[80%] px-4 py-3"
                  style={{
                    borderRadius: "16px",
                    backgroundColor: msg.from === "customer" ? "#6366F1" : "#F0F2F5",
                    color: msg.from === "customer" ? "#ffffff" : "#1A1A1A"
                  }}>
                  
                    <p className="text-[13px] leading-relaxed">{msg.text}</p>
                  </div>
                </div>
                <motion.div
                className={`mt-1.5 px-1 flex items-center gap-1 ${msg.from === "customer" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: showStatus ? 1 : 0 }}
                transition={{ duration: 0.3 }}>
                
                  <span className="text-[10px]" style={{ color: "#9CA3AF" }}>{msg.time}</span>
                  {msg.from === "customer" &&
                <Check className="h-3 w-3" style={{ color: "#9CA3AF" }} />
                }
                </motion.div>

                {msg.showProducts && showStatus &&
              <motion.div
                className="mt-3 flex gap-3 max-w-[85%]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}>
                
                    {products.map((product, j) =>
                <div key={j} className="flex-1 rounded-xl overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
                        <div className="h-20 w-full flex items-center justify-center p-2 overflow-hidden" style={{ backgroundColor: "#F9FAFB" }}>
                          {product.image ?
                    <img src={product.image} alt={product.name} className="h-full w-full object-contain" /> :

                    <span className="text-[10px] font-medium text-center leading-tight" style={{ color: "#65676B" }}>{product.name}</span>
                    }
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>{product.name}</p>
                          <p className="text-[11px] mt-0.5" style={{ color: "#9CA3AF" }}>{product.price}</p>
                          <button className="mt-2 w-full rounded-full px-2 py-1.5 text-[11px] font-semibold transition-opacity hover:opacity-80" style={{ backgroundColor: "#6366F1", color: "#ffffff" }}>
                            Add to Order
                          </button>
                        </div>
                      </div>
                )}
                  </motion.div>
              }
              </div>
            }
          </AnimatedChatBubble>
          );})()}
      </div>

      {/* Footer */}
      <div className="border-t px-5 py-3.5" style={{ borderColor: "#F0F0F0" }}>
        <div className="flex items-center gap-3 rounded-full border px-4 py-2.5" style={{ borderColor: "#E5E7EB" }}>
          <span className="flex-1 text-sm" style={{ color: "#9CA3AF" }}>Type a message...</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#6366F1" }}>
            <Send className="h-3.5 w-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>);

};

/* ── Telegram card ───────────────────────────────────────── */

const TelegramCard = ({ slide }: {slide: Slide;}) => {
  const { messages, products } = slide;

  return (
    <div
      className="w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden"
      style={{
        boxShadow: "0 25px 60px -12px hsla(220, 20%, 10%, 0.15), 0 12px 30px -8px hsla(220, 20%, 10%, 0.08)",
        transform: "perspective(1200px) rotateX(2deg) rotateY(-1deg)"
      }}>
      
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#517DA2" }}>
        <ChevronLeft className="h-5 w-5 text-white" />
        <div className="flex items-center gap-3 flex-1">
        <div 
          className={`flex h-9 w-9 items-center justify-center rounded-full overflow-hidden text-xs font-bold shrink-0 ${slide.avatarImage ? "bg-white" : "bg-[#3A6D8C]"}`}
        >
          {slide.avatarImage ? 
            <img src={slide.avatarImage} alt={slide.brand} className="w-full h-full object-contain p-1" /> :
            slide.avatarInitials
          }
        </div>
          <div>
            <p className="text-sm font-semibold text-white">{slide.agent} from {slide.brand}</p>
            <p className="text-[11px] text-white/70">online</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Search className="h-4.5 w-4.5 text-white/90" />
          <MoreVertical className="h-4.5 w-4.5 text-white/90" />
        </div>
      </div>

      {/* Messages with wallpaper */}
      <div className="h-[420px] overflow-y-auto" style={telegramBgStyle}>
        <div className="relative flex flex-col gap-2 p-4">
          {(() => {const timeline = computeTimeline(messages.length);return messages.map((msg, i) =>
            <AnimatedChatBubble key={i} startDelay={timeline[i]} isAI={msg.from === "ai"} align={msg.from === "customer" ? "right" : "left"} typingBgColor="#ffffff" typingDotColor="#8E8E93" typingBorderRadius="12px">
              {(showStatus) =>
              <div>
                  <div className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
                    <div
                    className="relative max-w-[78%] px-3.5 py-2 pb-4"
                    style={{
                      borderRadius: msg.from === "customer" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                      backgroundColor: msg.from === "customer" ? "#EEFFDE" : "#ffffff",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.08)"
                    }}>
                    
                      <p className="text-[13px] leading-relaxed" style={{ color: "#000000" }}>{msg.text}</p>
                      <motion.div
                      className="absolute bottom-1.5 right-2.5 flex items-center gap-0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showStatus ? 1 : 0 }}
                      transition={{ duration: 0.3 }}>
                      
                        <span className="text-[10px]" style={{ color: "#8E8E93" }}>{msg.time}</span>
                        {msg.from === "customer" &&
                      <CheckCheck className="h-3.5 w-3.5 ml-0.5" style={{ color: "#4FAE4E" }} />
                      }
                      </motion.div>
                    </div>
                  </div>

                  {msg.showProducts && showStatus &&
                <motion.div
                  className="mt-2 ml-0 flex gap-2 max-w-[78%]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}>
                  
                      {products.map((product, j) =>
                  <div key={j} className="flex-1 rounded-xl overflow-hidden" style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                          <div className="h-20 w-full flex items-center justify-center p-2 overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
                            {product.image ?
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain" /> :

                      <span className="text-[10px] font-medium text-center leading-tight" style={{ color: "#8E8E93" }}>{product.name}</span>
                      }
                          </div>
                          <div className="p-2.5">
                            <p className="text-xs font-semibold" style={{ color: "#000000" }}>{product.name}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: "#8E8E93" }}>{product.price}</p>
                            <button className="mt-2 w-full rounded-lg px-2 py-1.5 text-[11px] font-medium transition-opacity hover:opacity-80" style={{ backgroundColor: "#3390EC", color: "#ffffff" }}>
                              Add to Order
                            </button>
                          </div>
                        </div>
                  )}
                    </motion.div>
                }
                </div>
              }
            </AnimatedChatBubble>
            );})()}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E8E8" }}>
        <div className="flex items-center gap-2">
          <Smile className="h-5 w-5" style={{ color: "#8E8E93" }} />
          <div className="flex-1 text-sm" style={{ color: "#8E8E93" }}>Message</div>
          <div className="flex items-center gap-2">
            <Paperclip className="h-5 w-5" style={{ color: "#8E8E93" }} />
            <Mic className="h-5 w-5" style={{ color: "#8E8E93" }} />
          </div>
        </div>
      </div>
    </div>);

};

/* ── WhatsApp card ───────────────────────────────────────── */

const WhatsAppCard = ({ slide }: {slide: Slide;}) => {
  const { messages, products } = slide;

  return (
    <div
      className="w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden"
      style={{
        boxShadow: "0 25px 60px -12px hsla(220, 20%, 10%, 0.15), 0 12px 30px -8px hsla(220, 20%, 10%, 0.08)",
        transform: "perspective(1200px) rotateX(2deg) rotateY(-1deg)"
      }}>
      
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2.5" style={{ backgroundColor: "#075E54" }}>
        <ChevronLeft className="h-5 w-5 text-white" />
        <div 
          className={`flex h-9 w-9 items-center justify-center rounded-full overflow-hidden text-xs font-bold shrink-0 ${slide.avatarImage ? "bg-white" : "bg-[#25D366]"}`}
        >
          {slide.avatarImage ? 
            <img src={slide.avatarImage} alt={slide.brand} className="w-full h-full object-contain p-1" /> :
            slide.avatarInitials
          }
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{slide.agent} from {slide.brand}</p>
          <p className="text-[11px] text-white/70">online</p>
        </div>
        <div className="flex items-center gap-3">
          <Video className="h-4.5 w-4.5 text-white/90" />
          <Phone className="h-4.5 w-4.5 text-white/90" />
          <MoreVertical className="h-4.5 w-4.5 text-white/90" />
        </div>
      </div>

      {/* Messages with wallpaper */}
      <div className="h-[420px] overflow-y-auto" style={whatsappBgStyle}>
        <div className="relative flex flex-col gap-2 p-3">
          {(() => {const timeline = computeTimeline(messages.length);return messages.map((msg, i) =>
            <AnimatedChatBubble key={i} startDelay={timeline[i]} isAI={msg.from === "ai"} align={msg.from === "customer" ? "right" : "left"} typingBgColor="#ffffff" typingDotColor="#667781" typingBorderRadius="8px">
              {(showStatus) =>
              <div>
                  <div className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
                    <div
                    className="relative max-w-[80%] px-3 py-2 pb-4"
                    style={{
                      borderRadius: msg.from === "customer" ? "8px 8px 2px 8px" : "8px 8px 8px 2px",
                      backgroundColor: msg.from === "customer" ? "#DCF8C6" : "#ffffff",
                      boxShadow: "0 1px 1px rgba(0,0,0,0.06)"
                    }}>
                    
                      <p className="text-[13px] leading-relaxed" style={{ color: "#303030" }}>{msg.text}</p>
                      <motion.div
                      className="absolute bottom-1 right-2 flex items-center gap-0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showStatus ? 1 : 0 }}
                      transition={{ duration: 0.3 }}>
                      
                        <span className="text-[10px]" style={{ color: "#667781" }}>{msg.time}</span>
                        {msg.from === "customer" &&
                      <CheckCheck className="h-3.5 w-3.5 ml-0.5" style={{ color: "#34B7F1" }} />
                      }
                      </motion.div>
                    </div>
                  </div>

                  {msg.showProducts && showStatus &&
                <motion.div
                  className="mt-2 ml-0 flex gap-2 max-w-[80%]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}>
                  
                      {products.map((product, j) =>
                  <div key={j} className="flex-1 rounded-lg overflow-hidden" style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                          <div className="h-20 w-full flex items-center justify-center p-2 overflow-hidden" style={{ backgroundColor: "#F0F2F5" }}>
                            {product.image ?
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain" /> :

                      <span className="text-[10px] font-medium text-center leading-tight" style={{ color: "#667781" }}>{product.name}</span>
                      }
                          </div>
                          <div className="p-2.5">
                            <p className="text-xs font-semibold" style={{ color: "#303030" }}>{product.name}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: "#667781" }}>{product.price}</p>
                            <button className="mt-2 w-full rounded-lg px-2 py-1.5 text-[11px] font-medium transition-opacity hover:opacity-80" style={{ backgroundColor: "#25D366", color: "#ffffff" }}>
                              Add to Order
                            </button>
                          </div>
                        </div>
                  )}
                    </motion.div>
                }
                </div>
              }
            </AnimatedChatBubble>
            );})()}
        </div>
      </div>

      {/* Footer */}
      <div className="px-2 py-2" style={{ backgroundColor: "#E5DDD5" }}>
        <div className="flex items-center gap-2">
          <Smile className="h-5 w-5" style={{ color: "#54656F" }} />
          <div className="flex-1 rounded-full px-4 py-2" style={{ backgroundColor: "#ffffff" }}>
            <span className="text-sm" style={{ color: "#667781" }}>Type a message</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#00A884" }}>
            <Mic className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>);

};

/* ── platform router ─────────────────────────────────────── */

const ChatCard = ({ slide }: {slide: Slide;}) => {
  switch (slide.platform) {
    case "messenger":return <MessengerCard slide={slide} />;
    case "telegram":return <TelegramCard slide={slide} />;
    case "whatsapp":return <WhatsAppCard slide={slide} />;
  }
};

const platformIcons: Record<Platform, {src: string;alt: string;}> = {
  messenger: { src: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg", alt: "Messenger" },
  telegram: { src: "https://cdn.simpleicons.org/telegram", alt: "Telegram" },
  whatsapp: { src: "https://cdn.simpleicons.org/whatsapp", alt: "WhatsApp" }
};

/* ── industry tabs config ─────────────────────────────────── */

const industryTabs = [
{ label: "Sports", index: 0 },
{ label: "Tech", index: 1 },
{ label: "Health", index: 2 },
{ label: "Pet Food", index: 3 },
{ label: "Travel", index: 4 },
{ label: "Real Estate", index: 5 },
{ label: "Fitness", index: 6 }];


/* ── carousel ────────────────────────────────────────────── */

const HeroChatCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const [arrowTop, setArrowTop] = useState<string>("50%");

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const update = () => {
      const h = el.getBoundingClientRect().height;
      setArrowTop(`${h / 2}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeIndex]);

  const scrollActiveTabIntoView = useCallback((index: number) => {
    const tabsEl = tabsScrollRef.current;
    const activeTab = tabsEl?.querySelector<HTMLButtonElement>(`button[data-tab-index="${index}"]`);
    activeTab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  const scrollToSection = () => {
    // Only scroll if we are on mobile (sm breakpoint is 640px)
    if (window.innerWidth < 640) {
      document.getElementById("chats-we-power")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goPrev = () => {
    setActiveIndex((prev) => {
      const nextIndex = (prev - 1 + slides.length) % slides.length;
      scrollActiveTabIntoView(nextIndex);
      return nextIndex;
    });
    scrollToSection();
  };
  const goNext = () => {
    setActiveIndex((prev) => {
      const nextIndex = (prev + 1) % slides.length;
      scrollActiveTabIntoView(nextIndex);
      return nextIndex;
    });
    scrollToSection();
  };

  return (
    <div id="chats-we-power" className="mx-auto w-full max-w-[560px] text-left scroll-mt-20 sm:scroll-mt-24">
      {/* Section heading */}
      <motion.h2
        className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>See it in action


      </motion.h2>
      <motion.p
        className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}>
        
        See how our AI system adapts to every industry and platform.
      </motion.p>

      {/* Industry tabs */}
      <div id="industry-tabs" className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          ref={tabsScrollRef}
          className="flex gap-2 overflow-x-auto pb-2 px-6 scrollbar-hide touch-pan-x cursor-grab active:cursor-grabbing select-none"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onPointerDown={(event) => {
            const el = tabsScrollRef.current;
            if (!el) return;
            dragStateRef.current = {
              isDown: true,
              startX: event.clientX,
              scrollLeft: el.scrollLeft
            };
          }}
          onPointerMove={(event) => {
            const el = tabsScrollRef.current;
            const drag = dragStateRef.current;
            if (!el || !drag.isDown) return;
            el.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
          }}
          onPointerUp={() => {
            dragStateRef.current.isDown = false;
          }}
          onPointerLeave={() => {
            dragStateRef.current.isDown = false;
          }}>
          
          {industryTabs.map((tab) =>
          <button
            key={tab.index}
            data-tab-index={tab.index}
            onClick={() => {
              setActiveIndex(tab.index);
              scrollActiveTabIntoView(tab.index);
              scrollToSection();
            }}
            className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
            activeIndex === tab.index ?
            "bg-foreground text-background shadow-sm" :
            "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"}`
            }>
            
              {tab.label}
            </button>
          )}
        </motion.div>
      </div>

      {/* Card with arrows */}
      <div ref={containerRef} className="relative mt-8 scroll-mt-24">
        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute -left-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-secondary hover:shadow-md sm:-left-14"
          style={{ top: arrowTop, transform: "translateY(-50%)" }}
          aria-label="Previous">
          
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute -right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-secondary hover:shadow-md sm:-right-14"
          style={{ top: arrowTop, transform: "translateY(-50%)" }}
          aria-label="Next">
          
          <ChevronRight className="h-5 w-5" />
        </button>

        <div ref={cardRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}>
              
              {/* Platform icon */}
              <div className="mb-2 ml-1">
                <img
                  src={platformIcons[slides[activeIndex].platform].src}
                  alt={platformIcons[slides[activeIndex].platform].alt}
                  className="h-5 w-5 opacity-60" />
                
              </div>
              <ChatCard slide={slides[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>);

};

export default HeroChatCarousel;