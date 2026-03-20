import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getPageImage, source } from '@/lib/source';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  context: { params: { slug?: string[] } }
): Promise<NextResponse | ImageResponse> {
  const { slug } = context.params;
  const lang = request.nextUrl.searchParams.get('lang') ?? undefined;

  const page = source.getPage(slug, lang);
  if (!page) {
    return new NextResponse('Not found', { status: 404 });
  }

  const { title, description } = page.data;
  const og = getPageImage(page);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          padding: '80px',
          background: '#020817',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              fontSize: 24,
              opacity: 0.85,
              maxWidth: '80%',
            }}
          >
            {description}
          </div>
        ) : null}
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            opacity: 0.6,
          }}
        >
          docs.newapi.ai
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
