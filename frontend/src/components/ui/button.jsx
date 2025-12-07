import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-[-0.01em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4",
  {
    variants: {
      variant: {
        default: "bg-white text-primary shadow-lg shadow-white/30 hover:bg-white/90 focus-visible:ring-white/70",
        primary: "bg-primary text-white shadow-lg shadow-primary/40 hover:bg-primary/90 focus-visible:ring-white/70",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-white/30",
        outline: "border border-white/40 bg-white/5 text-white hover:bg-white/10 focus-visible:ring-white/60",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 focus-visible:ring-white/40",
        ghost: "text-white hover:bg-white/10 focus-visible:ring-white/30",
        link: "text-white underline-offset-4 hover:text-white/80 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-10 px-5 text-xs",
        lg: "h-12 px-8 text-base",
        pill: "h-14 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
