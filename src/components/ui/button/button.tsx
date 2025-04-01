import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md text-sm font-medium",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-text-primary",
          "hover:bg-primary/90",
          "active:bg-primary/95",
        ].join(" "),
        secondary: [
          "bg-secondary text-text-primary",
          "hover:bg-secondary/90",
          "active:bg-secondary/95",
        ].join(" "),
        accent: [
          "bg-accent text-white",
          "hover:bg-accent/90",
          "active:bg-accent/95",
        ].join(" "),
        cta: [
          "bg-cta text-white",
          "hover:bg-cta/90",
          "active:bg-cta/95",
          "shadow-lg shadow-cta/25",
          "hover:shadow-xl hover:shadow-cta/20",
        ].join(" "),
        outline: [
          "border-2 border-accent text-accent bg-transparent",
          "hover:bg-accent/10",
          "active:bg-accent/15",
        ].join(" "),
        ghost: [
          "text-text-primary bg-transparent",
          "hover:bg-surface-2",
          "active:bg-surface-3",
        ].join(" "),
        link: [
          "text-accent underline-offset-4 bg-transparent",
          "hover:underline",
          "active:text-accent/90",
        ].join(" "),
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        xs: "h-7 px-2 text-xs rounded",
        sm: "h-8 px-3 text-sm rounded",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-11 px-6 text-base rounded-md",
        xl: "h-12 px-8 text-lg rounded-lg",
        "2xl": "h-14 px-10 text-xl rounded-lg",
        icon: [
          "size-9 p-0",
          "xs:size-7",
          "sm:size-8",
          "md:size-9",
          "lg:size-10",
          "xl:size-11",
          "2xl:size-12",
        ].join(" "),
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };