import dotenv from 'dotenv';
dotenv.config();

const EMAIL_API_URL_DEFAULT =
  'https://us-central1-neatwebplatform-beta.cloudfunctions.net/sendEmail';

export async function sendEmail(
  email: string,
  body: string,
  subject = 'Notificación de adopción Pokémon'
): Promise<void> {
  const emailApiUrl = process.env.NEAT_EMAIL_API_URL || EMAIL_API_URL_DEFAULT;
  const emailApiKey = process.env.NEAT_EMAIL_API_KEY?.trim() || '';

  if (!emailApiKey) {
    console.warn('NEAT_EMAIL_API_KEY no configurada. Se omite envío de correo.');
    return;
  }

  const response = await fetch(emailApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-neat-api-key': emailApiKey
    },
    body: JSON.stringify({ email, subject, body })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error enviando correo: ${response.status} - ${text}`);
  }

  console.log(`[EMAIL OK] Enviado a ${email} | subject="${subject}"`);
}