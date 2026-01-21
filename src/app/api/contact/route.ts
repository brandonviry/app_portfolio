import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Schema de validation (identique au frontend pour cohérence)
const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  from_email: z.string().email("L'email n'est pas valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export async function POST(request: Request) {
  try {
    // Parse et valide les données
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const { name, from_email, message } = validatedData;

    // Timestamp pour traçabilité
    const timestamp = new Date().toLocaleString('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Indian/Reunion' // Fuseau horaire de La Réunion
    });

    // Envoi de l'email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Brandon Viry <onboarding@resend.dev>',
      to: 'brandonviry@gmail.com',
      reply_to: from_email,
      subject: `💼 Nouveau message de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header {
                background: linear-gradient(135deg, #00a8e8 0%, #0077b6 100%);
                color: white;
                padding: 30px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 2px solid #e0e0e0;
                border-top: none;
                border-radius: 0 0 8px 8px;
              }
              .info-row {
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f0f0f0;
              }
              .label {
                font-weight: bold;
                color: #00a8e8;
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 1px;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
                font-size: 16px;
              }
              .message-box {
                background: #f8f9fa;
                padding: 20px;
                border-left: 4px solid #00a8e8;
                margin-top: 20px;
                border-radius: 4px;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #666;
                font-size: 12px;
              }
              .corner-accent {
                width: 30px;
                height: 30px;
                border: 2px solid #ff3b3f;
                position: absolute;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">📬 Nouveau Message</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio Brandon Viry</p>
              </div>

              <div class="content">
                <div class="info-row">
                  <div class="label">👤 Nom</div>
                  <div class="value">${name}</div>
                </div>

                <div class="info-row">
                  <div class="label">📧 Email</div>
                  <div class="value">
                    <a href="mailto:${from_email}" style="color: #00a8e8; text-decoration: none;">
                      ${from_email}
                    </a>
                  </div>
                </div>

                <div class="info-row">
                  <div class="label">🕒 Reçu le</div>
                  <div class="value">${timestamp}</div>
                </div>

                <div class="label" style="margin-top: 20px;">💬 Message</div>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center;">
                  <a href="mailto:${from_email}"
                     style="display: inline-block; background: #ff3b3f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                    Répondre →
                  </a>
                </div>
              </div>

             
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        {
          error: 'Une erreur est survenue lors de l\'envoi de l\'email',
          details: error
        },
        { status: 400 }
      );
    }

    console.log('Email envoyé avec succès via Resend:', data);

    return NextResponse.json({
      success: true,
      message: 'Email envoyé avec succès',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Erreur API Contact:', error);

    // Erreur de validation Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: error.errors
        },
        { status: 400 }
      );
    }

    // Erreur générique
    return NextResponse.json(
      { error: 'Une erreur serveur est survenue' },
      { status: 500 }
    );
  }
}
