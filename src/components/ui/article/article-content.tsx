import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArticleImage } from "@/components/ui/media/article-image";
import { YouTubeEmbed } from "@/components/ui/media/youtube-embed";
import { TikTokEmbed } from "@/components/ui/media/tiktok-embed";
import { Divider } from "@/components/ui/decoration/divider";
import { cn } from "@/lib/utils";

// ─── Détection des médias standalone ────────────────────────────────────────

function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function extractTikTokId(url: string): string | null {
  const m = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  return m ? m[1] : null;
}

function isStandaloneImageUrl(url: string): boolean {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i.test(url);
}

function isUrl(str: string): boolean {
  return /^https?:\/\//i.test(str);
}

// ─── Découpage en blocs ──────────────────────────────────────────────────────

type Block =
  | { type: "markdown"; content: string }
  | { type: "youtube"; id: string }
  | { type: "tiktok"; id: string }
  | { type: "image"; url: string };

function parseBlocks(raw: string): Block[] {
  const lines = raw.split("\n");
  const blocks: Block[] = [];
  let mdLines: string[] = [];

  const flushMarkdown = () => {
    const text = mdLines.join("\n").trim();
    if (text) blocks.push({ type: "markdown", content: text });
    mdLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (isUrl(trimmed)) {
      const ytId = extractYouTubeId(trimmed);
      if (ytId) { flushMarkdown(); blocks.push({ type: "youtube", id: ytId }); continue; }

      const ttId = extractTikTokId(trimmed);
      if (ttId) { flushMarkdown(); blocks.push({ type: "tiktok", id: ttId }); continue; }

      if (isStandaloneImageUrl(trimmed)) {
        flushMarkdown();
        blocks.push({ type: "image", url: trimmed });
        continue;
      }
    }

    mdLines.push(line);
  }

  flushMarkdown();
  return blocks;
}

// ─── Renderers Markdown avec branding ────────────────────────────────────────

const markdownComponents: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  // Titres
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-extrabold text-accent tracking-tight mt-14 mb-6 scroll-m-20">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mt-12 mb-5 scroll-m-20 border-b border-border/20 pb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-semibold text-text-primary tracking-tight mt-10 mb-4 scroll-m-20">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-text-primary mt-8 mb-3 scroll-m-20">
      {children}
    </h4>
  ),

  // Paragraphe — si l'unique enfant est une image, on retire le <p>
  // pour éviter <div> dans <p> (HTML invalide → hydration error)
  p: ({ children, node }) => {
    const isImageOnly =
      node?.children?.length === 1 &&
      node.children[0].type === "element" &&
      (node.children[0] as { tagName?: string }).tagName === "img";

    if (isImageOnly) return <>{children}</>;

    return (
      <p className="text-base md:text-lg leading-8 text-text-secondary mb-6">
        {children}
      </p>
    );
  },

  // Gras / Italique
  strong: ({ children }) => (
    <strong className="font-bold text-text-primary">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-text-secondary">{children}</em>
  ),

  // Lien
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline underline-offset-4 hover:text-cta transition-colors duration-200"
    >
      {children}
    </a>
  ),

  // Listes
  ul: ({ children }) => (
    <ul className="my-6 space-y-3">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 space-y-3">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-text-secondary text-base leading-7">
      <div className="w-1.5 h-1.5 bg-accent mt-[0.6rem] shrink-0" />
      <span className="flex-1">{children}</span>
    </li>
  ),

  // Citation
  blockquote: ({ children }) => (
    <blockquote className={cn(
      "my-8 border-l-2 border-accent pl-6 italic",
      "text-text-secondary bg-surface-1 py-4 pr-6"
    )}>
      {children}
    </blockquote>
  ),

  // Code inline / bloc
  pre: ({ children }) => (
    <pre className={cn(
      "my-8 overflow-x-auto",
      "bg-surface-2 border border-border/20",
      "p-5 text-sm font-mono text-text-secondary leading-6"
    )}>
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return <code className={cn("font-mono text-sm", className)}>{children}</code>;
    }
    return (
      <code className="bg-surface-2 text-accent px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    );
  },

  // Séparateur
  hr: () => <Divider variant="gradient" align="center" className="my-10 mx-auto" />,

  // Image markdown ![alt](url)
  img: ({ src, alt }) =>
    src ? <ArticleImage src={src} alt={alt ?? ""} /> : null,

  // Tableau (GFM)
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse border border-border/20 text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-surface-2 text-text-primary">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border/20">{children}</tbody>
  ),
  tr: ({ children }) => <tr className="hover:bg-surface-1 transition-colors">{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold border border-border/20">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-text-secondary border border-border/20">{children}</td>
  ),

  // Texte barré (GFM)
  del: ({ children }) => (
    <del className="text-text-muted line-through">{children}</del>
  ),
};

// ─── Composant principal ─────────────────────────────────────────────────────

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-10">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "youtube":
            return <YouTubeEmbed key={i} videoId={block.id} />;
          case "tiktok":
            return <TikTokEmbed key={i} videoId={block.id} />;
          case "image":
            return <ArticleImage key={i} src={block.url} />;
          case "markdown":
            return (
              <div key={i} className="[&>*:first-child]:mt-0">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {block.content}
                </ReactMarkdown>
              </div>
            );
        }
      })}
    </div>
  );
}
