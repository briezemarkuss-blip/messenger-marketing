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
      <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-black/5 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-3xl font-black tracking-tighter text-foreground">
            Request a <span className="text-primary italic">Free Quote</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/80 font-medium">
            Take the first step towards AI-powered growth. We'll analyze your store and propose a custom strategy.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 relative z-10 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="rounded-xl border-black/5 bg-secondary/30 focus:bg-white transition-all" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Work Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@company.com" {...field} className="rounded-xl border-black/5 bg-secondary/30 focus:bg-white transition-all" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Store Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} className="rounded-xl border-black/5 bg-secondary/30 focus:bg-white transition-all" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Monthly Orders</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-black/5 bg-secondary/30 focus:bg-white transition-all">
                          <SelectValue placeholder="Select volume" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-black/10">
                        <SelectItem value="0-100">Under 100</SelectItem>
                        <SelectItem value="100-1000">100 - 1,000</SelectItem>
                        <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                        <SelectItem value="5000+">5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Tell us about your goals</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="I want to reduce cart abandonment and improve customer support auto-resolution..." 
                      className="min-h-[100px] rounded-xl border-black/5 bg-secondary/30 focus:bg-white transition-all resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-full h-12 bg-black text-white hover:bg-black/90 font-black tracking-tight text-[15px] mt-2 group">
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
