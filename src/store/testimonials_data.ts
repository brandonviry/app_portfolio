/**
 * Store local pour les données de témoignages clients
 */

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  photoUrl: string | null;
  rating: number;
};

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Client 1",
    role: "CEO",
    company: "Entreprise 1",
    content: "Témoignage exemple - À remplacer par un vrai témoignage client",
    photoUrl: null, // À remplacer par "/images/testimonials/client1.jpg"
    rating: 5
  },
  {
    id: 2,
    name: "Client 2",
    role: "CTO",
    company: "Entreprise 2",
    content: "Témoignage exemple - À remplacer par un vrai témoignage client",
    photoUrl: null, // À remplacer par "/images/testimonials/client2.jpg"
    rating: 5
  },
  {
    id: 3,
    name: "Client 3",
    role: "Project Manager",
    company: "Entreprise 3",
    content: "Témoignage exemple - À remplacer par un vrai témoignage client",
    photoUrl: null, // À remplacer par "/images/testimonials/client3.jpg"
    rating: 5
  }
];
