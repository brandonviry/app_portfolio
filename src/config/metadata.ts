import { Metadata } from 'next'

type PageMetadata = {
  [key: string]: Metadata
}

interface SocialMedia {
  github: string
  linkedin: string
  instagram?: string
}

const siteConfig = {
  name: 'VIRY BRANDON',
  title: 'Portfolio VIRY BRANDON',
  url: 'https://devweb.viry-brandon.fr',
  description: 'Portfolio professionnel de VIRY BRANDON - Développeur Full Stack spécialisé en React, Next.js, et technologies modernes du web',
  socialMedia: {
    github: 'https://github.com/brandonviry/',
    linkedin: 'https://linkedin.com/in/brandon-viry-81187b237',
    instagram: 'https://www.instagram.com/virybrandon/'
  } as SocialMedia,
  locale: 'fr-FR',
  type: 'website' as const
}

const defaultOpenGraph: NonNullable<Metadata['openGraph']> = {
  type: 'website',
  locale: siteConfig.locale,
  url: siteConfig.url,
  title: siteConfig.title,
  description: siteConfig.description,
  siteName: siteConfig.title,
  images: [
    {
      url: `${siteConfig.url}/images/og-image.jpg`,
      width: 204,
      height: 196,
      alt: siteConfig.title,
    },
  ],
}

const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Portfolio VIRY BRANDON'
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'développeur',
    'full stack',
    'portfolio',
    'web',
    'VIRY BRANDON',
    'React',
    'Next.js',
    'TypeScript',
    'développement web',
    'frontend',
    'backend'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: '',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: defaultOpenGraph,
  icons: {
    icon: '/images/og-image.jpg',
    shortcut: '/images/og-image.jpg',
    apple: '/images/og-image.jpg'
  },
  manifest: '/site.webmanifest',
  themeColor: '#000000',
  category: 'technology',
}

export const metadata: PageMetadata = {
  home: {
    ...defaultMetadata,
    title: 'Accueil | Portfolio VIRY BRANDON',
    description: 'Bienvenue sur le portfolio de VIRY BRANDON - Développeur Full Stack passionné par la création d\'expériences web innovantes et performantes',
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      ...defaultOpenGraph,
      title: 'Accueil | Portfolio VIRY BRANDON',
      url: siteConfig.url,
    },
  },
  projects: {
    ...defaultMetadata,
    title: 'Projets | Portfolio VIRY BRANDON',
    description: 'Découvrez mes projets et réalisations en tant que développeur Full Stack. Portfolio de projets web innovants utilisant React, Next.js et les dernières technologies.',
    keywords: [...defaultMetadata.keywords as string[], 'projets', 'réalisations', 'développement web', 'applications web', 'sites web'],
    alternates: {
      canonical: `${siteConfig.url}/projets`,
    },
    openGraph: {
      ...defaultOpenGraph,
      type: 'website',
      title: 'Projets | Portfolio VIRY BRANDON',
      url: `${siteConfig.url}/projets`,
    },
  },
  contact: {
    ...defaultMetadata,
    title: 'Contact | Portfolio VIRY BRANDON',
    description: 'Contactez VIRY BRANDON pour vos projets de développement web. Disponible pour des missions freelance et des collaborations techniques.',
    keywords: [...defaultMetadata.keywords as string[], 'contact', 'collaboration', 'freelance', 'mission', 'développement sur mesure'],
    alternates: {
      canonical: `${siteConfig.url}/contact`,
    },
    openGraph: {
      ...defaultOpenGraph,
      type: 'website',
      title: 'Contact | Portfolio VIRY BRANDON',
      url: `${siteConfig.url}/contact`,
    },
  },
}

export const getPageMetadata = (page: keyof typeof metadata): Metadata => {
  return metadata[page]
}

export default metadata
