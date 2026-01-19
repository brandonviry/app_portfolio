import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center text-sm font-medium",
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
          "border-2 border-cta text-cta  bg-transparent",
          "hover:bg-cta/10",
          "active:bg-cta/15",
        ].join(" "),
        ghost: [
          "text-text-secondary bg-transparent",
          "hover:text-cta hover:bg-cta/10",
          "active:bg-cta/15",
        ].join(" "),
        link: [
          "text-accent underline-offset-4 bg-transparent",
          "hover:underline",
          "active:text-accent/90",
        ].join(" "),
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-lg",
        "2xl": "h-14 px-10 text-xl",
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

// Props pour bouton normal
interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

// Props quand c'est un bouton HTML
interface ButtonAsButton extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

// Props quand c'est un lien
interface ButtonAsLink extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, fullWidth, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, fullWidth, className }));

    // Si href est fourni, rendre un lien Next.js
    if (href) {
      const { external, ...restProps } = props as ButtonAsLink;

      // Lien externe (ouvre dans nouvel onglet)
      if (external) {
        return (
          <a
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...restProps}
            href={href}
          >
            {children}
          </a>
        );
      }

      // Lien interne Next.js
      return (
        <Link
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...restProps}
          href={href}
        >
          {children}
        </Link>
      );
    }

    // Sinon, rendre un bouton normal
    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
