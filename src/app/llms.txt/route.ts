import { generateLLMsText, generateLLMsFullText } from '@/lib/llms';
import { i18n } from '@/lib/i18n';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') ?? i18n.defaultLanguage;
  const variant = searchParams.get('variant') ?? 'index';

  const origin = request.headers.get('x-forwarded-host')
    ? `${request.headers.get('x-forwarded-proto') ?? 'https'}://${request.headers.get('x-forwarded-host')}`
    : new URL(request.url).origin;

  let body: string;

  if (variant === 'full') {
    body = await generateLLMsFullText(lang);
  } else {
    body = generateLLMsText(origin, lang);
  }

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
