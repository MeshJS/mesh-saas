import { cn } from "@/lib/utils";
import * as React from "react";

export const Overlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed left-0 top-0 z-[50] flex h-screen w-screen items-center justify-center bg-transparent backdrop-blur-sm",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));

export interface OverlayInteractiveProps {
  onClick?: () => void;
}

export const OverlayInteractive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, onClick }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className={cn("absolute left-0 top-0 z-[-1] h-full w-full", className)}
  />
));
