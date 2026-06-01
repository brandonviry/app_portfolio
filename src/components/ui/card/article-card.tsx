import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  author: string;
  date: string;
  category: string;
  href: string;
  imageSrc?: string;
}

export function ArticleCard({ title, author, date, category, href, imageSrc }: ArticleCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col",
        "bg-surface-1 border border-border/20",
        "overflow-hidden",
        "transition-all duration-300",
        "hover:border-accent/40 hover:-translate-y-1",
        "hover:shadow-lg hover:shadow-accent/10"
      )}
    >
      <div className="relative aspect-video bg-surface-2 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-text-muted text-xs uppercase tracking-widest">À venir</span>
          </div>
        )}
        <span className={cn(
          "absolute top-3 left-3",
          "px-2 py-1 text-xs font-semibold uppercase tracking-wide",
          "bg-accent text-white"
        )}>
          {category}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <Typography
          level="h5"
          className="text-text-primary line-clamp-2 group-hover:text-accent transition-colors duration-200 text-base"
        >
          {title}
        </Typography>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/20">
          <Typography level="body2" className="text-text-muted text-xs">
            {author}
          </Typography>
          <Typography level="body2" className="text-text-muted text-xs">
            {date}
          </Typography>
        </div>
      </div>
    </Link>
  );
}
