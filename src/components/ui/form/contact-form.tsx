"use client";

import { Button } from "@/components/ui/button/button";
import { FormInput } from "@/components/ui/form/form-input";
import { FormTextarea } from "@/components/ui/form/form-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  from_email: z.string().email("L'email n'est pas valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('idle');
      setErrorMessage(null);

      console.log('Envoi du formulaire avec:', data);

      // Appel à l'API Route Next.js
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      console.log('Email envoyé avec succès via Resend:', result);
      setSubmitStatus('success');
      reset();

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error("Erreur d'envoi:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard."
      );
      setSubmitStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Name */}
      <div>
        <FormInput
          label="Nom"
          placeholder="Votre nom"
          error={errors.name?.message}
          {...register("name")}
        />
      </div>

      {/* Email */}
      <div>
        <FormInput
          label="Email"
          type="email"
          placeholder="votre.email@example.com"
          error={errors.from_email?.message}
          {...register("from_email")}
        />
      </div>

      {/* Message */}
      <div>
        <FormTextarea
          label="Message"
          placeholder="Votre message..."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="cta"
          className="w-full"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Envoi en cours...
            </span>
          ) : (
            "Envoyer"
          )}
        </Button>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="text-green-600 text-center mt-4">
          ✅ Message envoyé avec succès !
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-600 text-center mt-4">
          ❌ {errorMessage}
        </div>
      )}
    </form>
  );
}
