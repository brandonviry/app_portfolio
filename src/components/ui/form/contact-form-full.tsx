"use client";

import { Button } from "@/components/ui/button/button";
import { FormInput } from "@/components/ui/form/form-input";
import { FormTextarea } from "@/components/ui/form/form-textarea";
import { FormCheckbox } from "@/components/ui/form/form-checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  mail: z.string().email("L'adresse mail n'est pas valide"),
  sujet: z.string().min(3, "Le sujet doit contenir au moins 3 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter pour envoyer le formulaire" }),
  }),
});

type FormData = z.infer<typeof schema>;

export function ContactFormFull() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitStatus("idle");
      setErrorMessage(null);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.prenom} ${data.nom}`,
          from_email: data.mail,
          message: `Sujet : ${data.sujet}\n\n${data.message}`,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur lors de l'envoi");

      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer plus tard."
      );
      setSubmitStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormInput
          label="Nom de famille"
          placeholder="Votre nom"
          error={errors.nom?.message}
          {...register("nom")}
        />
        <FormInput
          label="Prénom"
          placeholder="Votre prénom"
          error={errors.prenom?.message}
          {...register("prenom")}
        />
      </div>

      <FormInput
        label="Adresse mail"
        type="email"
        placeholder="votre.email@exemple.com"
        error={errors.mail?.message}
        {...register("mail")}
      />

      <FormInput
        label="Sujet"
        placeholder="L'objet de votre message"
        error={errors.sujet?.message}
        {...register("sujet")}
      />

      <FormTextarea
        label="Votre message"
        placeholder="Écrivez votre message ici..."
        className="min-h-[140px]"
        error={errors.message?.message}
        {...register("message")}
      />

      <FormCheckbox
        label="Je consens à ce que ce site stocke les informations que j'ai envoyées afin de pouvoir répondre à ma demande."
        error={errors.consent?.message}
        {...register("consent")}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="cta"
        className="w-full tracking-widest uppercase text-sm font-bold"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Envoi en cours...
          </span>
        ) : (
          "ENVOYER"
        )}
      </Button>

      {submitStatus === "success" && (
        <p className="text-green-600 text-center text-sm">Message envoyé avec succès !</p>
      )}
      {submitStatus === "error" && errorMessage && (
        <p className="text-red-500 text-center text-sm">{errorMessage}</p>
      )}
    </form>
  );
}
