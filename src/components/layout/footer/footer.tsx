import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Github, Linkedin, Instagram, Home, FolderGit2, Mail } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/brandonviry/', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/brandon-viry-81187b237', icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/virybrandon/', icon: Instagram },
];

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Projets', href: '/projets', icon: FolderGit2 },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Typography level="h6" className="text-foreground">
              Portfolio
            </Typography>
            <Typography level="body2" className="text-foreground/60">
              Développeur Full Stack passionné par la création d&apos;expériences web innovantes.
            </Typography>
          </div>

          {/* Navigation */}
          <div>
            <Typography level="h6" className="text-foreground mb-4">
              Navigation
            </Typography>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2",
                      "text-cta",
                      "hover:text-cta/80 hover:underline",
                      "transition-colors duration-200",
                      "font-medium"
                    )}
                  >
                    <item.icon className="w-4 h-4" strokeWidth={2.5} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <Typography level="h6" className="text-foreground mb-4">
              Me suivre
            </Typography>
            <ul className="space-y-2">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2",
                      "text-cta",
                      "hover:text-cta/80 hover:underline",
                      "transition-colors duration-200",
                      "font-medium"
                    )}
                  >
                    <item.icon className="w-4 h-4" strokeWidth={2.5} />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <Typography level="body2" className="text-foreground/60">
            &copy; {currentYear} Portfolio. Tous droits réservés.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
