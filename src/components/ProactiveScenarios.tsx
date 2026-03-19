import { motion } from "framer-motion";
import ProactiveChatCard from "./ProactiveChatCard";

const apexTechTheme = {
  accent: "hsl(215 80% 52%)",
  accentForeground: "hsl(0 0% 100%)",
  userBubble: "hsl(215 25% 27%)",
  userBubbleForeground: "hsl(0 0% 100%)",
  avatarBg: "hsl(215 20% 93%)",
  avatarBorder: "hsl(215 80% 52%)",
};

const glowLabTheme = {
  accent: "#25D366",
  accentForeground: "#ffffff",
  userBubble: "#DCF8C6",
  userBubbleForeground: "#303030",
  avatarBg: "#075E54",
  avatarBorder: "#075E54",
};

const apexMessages = [
  {
    from: "ai" as const,
    text: "Hey Alex! 👋 I saw your new Mirrorless Camera arrived. Are you planning any trips soon? The weather looks bright this weekend for outdoor shots.",
    time: "10:34 AM",
  },
  {
    from: "customer" as const,
    text: "I am actually heading to the coast! Super excited to test it out.",
    time: "10:35 AM",
  },
  {
    from: "ai" as const,
    text: "The coast will be amazing! ☀️ Have you considered a polarizing filter? It's essential for cutting glare. I'd recommend these:",
    time: "10:35 AM",
    showProducts: true,
  },
  {
    from: "customer" as const,
    text: "Oh, I didn't think of that! Thanks for the tip!",
    time: "10:36 AM",
  },
];

const apexProducts = [
  { name: "Circular Polarizer Filter", price: "$49.95" },
  { name: "Lens Cleaning Kit", price: "$14.95" },
];

const glowMessages = [
  {
    from: "ai" as const,
    text: "Hi Maya! ☀️ I noticed a heatwave is hitting Los Angeles this week. The UV index is reaching a level 9.",
    time: "10:34 AM",
  },
  {
    from: "customer" as const,
    text: "Oh wow, I didn't even check the weather! I was just planning to go for a run.",
    time: "10:35 AM",
  },
  {
    from: "ai" as const,
    text: "Since you're using our Retinol Serum at night, your skin is more sensitive. I'd recommend these for your run:",
    time: "10:35 AM",
    showProducts: true,
  },
  {
    from: "customer" as const,
    text: "That's a lifesaver. Add the SPF to my order, please!",
    time: "10:36 AM",
  },
];

const glowProducts = [
  { name: "Mineral SPF 50+", price: "$24.00" },
  { name: "Aloe Cooling Mist", price: "$16.00" },
];

const ProactiveScenarios = () => {
  return (
    <section className="border-t border-border/60 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-4 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.2, 0, 0.2, 1] }}
        >
          Proactive Scenarios
        </motion.h2>
        <motion.p
          className="mx-auto mb-14 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          See how different brands use contextual AI to turn routine check-ins into revenue.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          <ProactiveChatCard
            brandName="Apex Tech"
            agentName="Sarah"
            avatarInitials="AT"
            messages={apexMessages}
            products={apexProducts}
            theme={apexTechTheme}
          />
          <ProactiveChatCard
            brandName="Glow Lab"
            agentName="Sophie"
            avatarInitials="GL"
            messages={glowMessages}
            products={glowProducts}
            theme={glowLabTheme}
          />
        </div>
      </div>
    </section>
  );
};

export default ProactiveScenarios;
