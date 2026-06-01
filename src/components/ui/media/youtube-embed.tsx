import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  videoId: string;
}

export function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  return (
    <figure className={cn("my-8 border border-border/20 overflow-hidden")}>
      {/* Barre de label */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 border-b border-border/20">
        <div className="w-1.5 h-1.5 bg-cta" />
        <span className="text-[0.6rem] text-text-muted uppercase tracking-widest">YouTube</span>
      </div>

      {/* Embed 16:9 responsive */}
      <div className="relative w-full aspect-video bg-surface-2">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </figure>
  );
}
