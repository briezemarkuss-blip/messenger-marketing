import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").or(z.string().length(0)).optional(),
  orders: z.string().min(1, "Please select monthly order volume"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface QuoteDialogProps {
  children: React.ReactNode;
}

const QuoteDialog = ({ children }: QuoteDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      website: "",
      orders: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Quote request sent!", {
      description: "Our team will review your details and get back to you shortly.",
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent 
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[500px] rounded-[2rem] bg-zinc-950 border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden text-white p-0 p-8 sm:p-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <DialogHeader className="relative z-10 space-y-2">
          <DialogTitle className="text-3xl font-black tracking-tighter text-white">
            Request a <span className="text-primary italic">Free Quote</span>
          </DialogTitle>
          <DialogDescription className="text-zinc-400 font-medium">
            Take the first step towards AI-powered growth. We'll analyze your store and propose a custom strategy.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10 mt-8">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="h-11 rounded-xl border-white/5 bg-white/5 focus:bg-white/10 text-white transition-all placeholder:text-white/20" />
                    </FormControl>
                    <FormMessage className="text-red-400 text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Work Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@company.com" {...field} className="h-11 rounded-xl border-white/5 bg-white/5 focus:bg-white/10 text-white transition-all placeholder:text-white/20" />
                    </FormControl>
                    <FormMessage className="text-red-400 text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Store Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} className="h-11 rounded-xl border-white/5 bg-white/5 focus:bg-white/10 text-white transition-all placeholder:text-white/20" />
                    </FormControl>
                    <FormMessage className="text-red-400 text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orders"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Monthly Orders</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl border-white/5 bg-white/5 focus:bg-white/10 text-white transition-all">
                          <SelectValue placeholder="Select volume" className="placeholder:text-white/20" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-white/10 bg-zinc-900 text-white">
                        <SelectItem value="0-100">Under 100</SelectItem>
                        <SelectItem value="100-1000">100 - 1,000</SelectItem>
                        <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                        <SelectItem value="5000+">5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Tell us about your goals</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="I want to reduce..." 
                      className="min-h-[100px] rounded-xl border-white/5 bg-white/5 focus:bg-white/10 text-white transition-all resize-none placeholder:text-white/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-[10px]" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-full h-12 bg-white text-black hover:bg-zinc-200 font-bold tracking-tight text-[15px] mt-2 group transition-all hover:scale-[1.02] active:scale-[0.98]">
              Send Quote Request
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
