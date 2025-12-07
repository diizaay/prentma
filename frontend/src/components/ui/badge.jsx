import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white hover:bg-primary/90",
        secondary: "border-transparent bg-white/15 text-white hover:bg-white/25",
        destructive: "border-transparent bg-destructive text-white hover:bg-destructive/90",
        outline: "border-white/50 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
