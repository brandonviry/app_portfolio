export const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
} as const;

// Vérification de la configuration
if (!emailConfig.serviceId || 
    !emailConfig.templateId || 
    !emailConfig.publicKey) {
  console.error('La configuration EmailJS est incomplète. Vérifiez votre fichier .env.local');
}
