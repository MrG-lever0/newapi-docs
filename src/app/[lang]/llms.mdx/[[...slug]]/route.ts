import { getLLMText, source } from '@/lib/source';

export async function GET(
  request: Request,
  context: { params: Promise<{ lang: string; slug?: string[] }> }
): Promise<Response> {
  const {
    lang,
    slug,
  } = await context.params;

  const page = source.getPage(slug, lang);
  if (!page) {
    return new Response('Not found', { status: 404 });
  }

  const text = await getLLMText(page);

  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
