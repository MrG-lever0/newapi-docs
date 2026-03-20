import { i18n } from '@/lib/i18n';
import { generateLLMsFullText } from '@/lib/llms';

export async function GET(
  request: Request,
  context: { params: Promise<{ lang: string }> }
): Promise<Response> {
  const { lang } = await context.params;

  const resolvedLang = i18n.languages.includes(
    lang as (typeof i18n.languages)[number]
  )
    ? lang
    : i18n.defaultLanguage;

  const body = await generateLLMsFullText(resolvedLang);

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
