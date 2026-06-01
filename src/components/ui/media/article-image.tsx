import { cn } from "@/lib/utils";

interface ArticleImageProps {
  src: string;
  alt?: string;
}

export function ArticleImage({ src, alt = "" }: ArticleImageProps) {
  return (
    <figure className={cn("my-8 border border-border/20 overflow-hidden")}>
      {/* Barre de label */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 border-b border-border/20">
        <div className="w-1.5 h-1.5 bg-accent" />
        <span className="text-[0.6rem] text-text-muted uppercase tracking-widest">Image</span>
      </div>

      {/* Image */}
      <div className="relative w-full bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      {alt && (
        <figcaption className="px-3 py-2 text-xs text-text-muted border-t border-border/20 bg-surface-1 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
