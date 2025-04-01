"use client";

import { Button } from "@/components/ui/button/button";
import { FormInput } from "@/components/ui/form/form-input";
import { FormTextarea } from "@/components/ui/form/form-textarea";
import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from '@emailjs/browser';
import { useState, useEffect, useRef } from "react";
import { emailConfig } from "@/config/email";

const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  from_email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    emailjs.init(emailConfig.publicKey);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!formRef.current) return;

    try {
      setSubmitStatus('idle');
      
      const templateParams = {
        name: data.name,
        time: new Date().toLocaleString('fr-FR', { 
          dateStyle: 'full', 
          timeStyle: 'short' 
        }),
        message: data.message,
        from_email: data.from_email
      };

      console.log('Envoi avec les paramètres:', {
        serviceId: emailConfig.serviceId,
        templateId: emailConfig.templateId,
        templateParams
      });

      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );

      console.log('Email envoyé avec succès:', result);
      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      console.error("Erreur d'envoi:", {
        message: error?.message,
        name: error?.name,
        status: error?.status,
        text: error?.text
      });
      setSubmitStatus('error');
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "w-full max-w-2xl mx-auto",
        "p-6 md:p-8",
        "bg-background/50",
        "backdrop-blur-sm",
        "border border-border/10",
        "rounded-2xl",
        "shadow-lg shadow-accent/5"
      )}
    >
      <Typography
        level="h5"
        className={cn(
          "text-text-primary",
          "text-center",
          "mb-6"
        )}
      >
        Envoyez-moi un message
      </Typography>

      <div className="space-y-6">
        {/* Nom */}
        <div>
          <FormInput
            label="Nom"
            {...register("name")}
            name="name"
            id="name"
            type="text"
            placeholder="Votre nom"
            className={cn(
              errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <FormInput
            label="Email"
            {...register("from_email")}
            name="from_email"
            id="from_email"
            type="email"
            placeholder="votre.email@example.com"
            className={cn(
              errors.from_email && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
          />
          {errors.from_email && (
            <p className="mt-1 text-sm text-red-500">{errors.from_email.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <FormTextarea
            label="Message"
            {...register("message")}
            name="message"
            id="message"
            rows={5}
            placeholder="Votre message..."
            className={cn(
              errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500",
              "resize-none"
            )}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="cta"
            size="lg"
            className={cn(
              "w-full",
              "font-medium",
              "disabled:opacity-50"
            )}
            disabled={isSubmitting}
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

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <p className="mt-4 text-sm text-green-500 text-center">
              Message envoyé avec succès ! Je vous répondrai dès que possible.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-4 text-sm text-red-500 text-center">
              Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
