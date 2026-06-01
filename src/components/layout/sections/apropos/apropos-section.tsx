import { Typography } from "@/components/ui/typography/typography";
import { Divider } from "@/components/ui/decoration/divider";
import { cn } from "@/lib/utils";

const bioParagraphs = [
  "Programmeur de formation, j'ai débuté mon parcours par la logique et la rigueur du code. Cette base m'a naturellement conduit vers le métier de développeur web, où j'ai commencé à façonner des interfaces, comprendre l'architecture des sites, et construire des expériences digitales dynamiques.",
  "Avec le temps, mon intérêt pour l'esthétique et la communication visuelle m'a poussé à explorer le monde du design. En tant que graphiste débutant, je me passionne pour l'identité visuelle, le contenu digital et les supports de communication, toujours avec un regard curieux et en constante évolution. Mon objectif : créer des visuels cohérents, esthétiques et adaptés aux besoins réels des marques et créateurs.",
  "Aujourd'hui, je me définis comme un Product Maker : un créateur de solutions digitales polyvalent, capable de combiner développement, design, no-code, automatisation et outils adaptés à chaque projet. Je maîtrise des plateformes comme Webflow, Notion, Zapier, WordPress, Stripe, Canva, ainsi que des outils créatifs comme Photoshop, Figma, Illustrator, Affinity Suite, VS Code, etc.",
  "Je conçois des systèmes efficaces, agiles, pensés pour la performance, l'autonomie et l'expérience utilisateur.",
];

const socialLinks = [
  {
    reseau: "INSTAGRAM",
    description: "Mes créations en tant que Graphiste",
    href: "https://www.instagram.com/virybrandon/",
  },
  {
    reseau: "LINKEDIN",
    description: "Mes créations en tant que développeur web",
    href: "https://www.linkedin.com/in/brandon-viry-81187b237/",
  },
  {
    reseau: "REDDIT",
    description: "Mes créations en tant que Full-Stack Product Maker",
    href: "https://www.reddit.com/user/virybrandon/",
  },
];

export function AproposSection() {
  return (
    <section className={cn("relative py-16 md:py-24 overflow-hidden")}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-1/20 via-transparent to-surface-1/20 opacity-50" />

      <div className={cn("container mx-auto px-4 sm:px-6 max-w-4xl")}>
        {/* Bio */}
        <div className="space-y-4 mb-16">
          <Typography
            level="h2"
            className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            A propos
          </Typography>
          <Divider variant="gradient" align="left" />

          <div className="space-y-5 pt-4">
            {bioParagraphs.map((paragraph, i) => (
              <Typography
                key={i}
                level="body1"
                className="text-text-secondary leading-relaxed"
              >
                {paragraph}
              </Typography>
            ))}
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Typography
              level="h3"
              className="text-text-primary font-semibold"
            >
              Suivre mes créations en temps réel
            </Typography>
            <Divider variant="gradient" align="left" />
          </div>

          <div className="flex flex-col gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.reseau}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center justify-between",
                  "p-5 bg-surface-1 border border-border/20",
                  "transition-all duration-300",
                  "hover:border-accent/40 hover:shadow-md hover:shadow-accent/10"
                )}
              >
                <div className="flex flex-col gap-1">
                  <Typography
                    level="h6"
                    className="text-accent font-bold tracking-widest group-hover:text-cta transition-colors duration-200"
                  >
                    {item.reseau}
                  </Typography>
                  <Typography
                    level="body2"
                    className="text-text-secondary"
                  >
                    {item.description}
                  </Typography>
                </div>
                <span className="text-text-muted group-hover:text-accent transition-colors duration-200 text-lg">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
