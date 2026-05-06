import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-ink border-gray-200",
        amber: "bg-amber-50 text-amber-800 border-amber-200",
        blue: "bg-blue-50 text-blue-800 border-blue-200",
        emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
        violet: "bg-violet-50 text-violet-800 border-violet-200",
        rose: "bg-rose-50 text-rose-800 border-rose-200",
        brand: "bg-orange-50 text-orange-700 border-orange-200",
        outline: "bg-transparent text-ink border-gray-300",
        muted: "bg-gray-50 text-gray-600 border-gray-200",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
