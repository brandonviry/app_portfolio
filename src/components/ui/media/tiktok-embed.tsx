import { cn } from "@/lib/utils";

interface TikTokEmbedProps {
  videoId: string;
}

export function TikTokEmbed({ videoId }: TikTokEmbedProps) {
  return (
    <figure className={cn("my-8 border border-border/20 overflow-hidden max-w-sm mx-auto")}>
      {/* Barre de label */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 border-b border-border/20">
        <div className="w-1.5 h-1.5 bg-accent" />
        <span className="text-[0.6rem] text-text-muted uppercase tracking-widest">TikTok</span>
      </div>

      {/* Embed 9:16 responsive */}
      <div className="relative w-full bg-surface-2" style={{ paddingBottom: "177.78%" }}>
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title="TikTok video"
          allow="encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </figure>
  );
}
