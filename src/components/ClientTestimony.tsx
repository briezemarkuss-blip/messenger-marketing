import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const ClientTestimony = () => {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-black tracking-tighter text-foreground sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Real Impact, <span className="text-primary italic text-[0.9em]">Direct from our Partners.</span>
          </motion.h2>
        </div>

        <motion.div
          className="relative bg-white rounded-[3.5rem] border border-black/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:border-black/10"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row min-h-[450px]">
            {/* Quote Section */}
            <div className="flex-1 p-12 sm:p-16 flex flex-col justify-center relative">
              <Quote className="absolute top-12 left-12 h-12 w-12 text-primary/5 -z-0" />

              <div className="relative z-10">
                <blockquote className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-[1.3] mb-10">
                  "Heartfelt thanks for the successful start. The conversion results are truly impressive—we saw regular customers being recovered and making high-value orders immediately. The ROI is evident, and it’s a huge pleasure to collaborate."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center font-black text-foreground/40 text-sm">
                    ZL
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-lg tracking-tight">CEO, Zorro.lv</h4>
                    <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">Leading Pet Food Retailer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="md:w-[320px] bg-primary/[0.02] border-l border-black/[0.03] p-12 flex flex-col justify-center gap-10">
              <div>
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-3 block">Conversion lift</span>
                <p className="text-5xl font-black tracking-tighter text-foreground leading-none">+10%</p>
                <p className="mt-2 text-[13px] font-medium text-muted-foreground/80 leading-snug">Average sales increase during pilot phase</p>
              </div>

              <div className="pt-10 border-t border-black/[0.05]">
                <span className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-3 block">Key Insight</span>
                <p className="text-lg font-bold text-foreground leading-tight tracking-tight">Successful recovery of high-value monthly subscribers (+90€ orders).</p>
              </div>

              <div className="mt-auto">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                  <div className="h-8 py-1 px-3 rounded-full border-2 border-white bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-foreground/60 tracking-wider">
                    TRUSTED PARTNER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientTestimony;
