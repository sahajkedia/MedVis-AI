import { getApiBaseUrl } from '@/lib/config';

export default async function HomePage() {
  const baseUrl = getApiBaseUrl();
  let apiStatus = 'unknown';
  try {
    const res = await fetch(`${baseUrl}/health`, { next: { revalidate: 0 } });
    if (res.ok) {
      const data = (await res.json()) as { status?: string };
      apiStatus = data?.status ?? 'ok';
    } else {
      apiStatus = `error ${res.status}`;
    }
  } catch {
    apiStatus = 'unreachable';
  }

  return (
    <main
      style={{
        padding: 24,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial',
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>MedVis AI</h1>
      <p style={{ color: '#444', marginBottom: 16 }}>
        Welcome. This is the base setup. Check the health endpoint and README to get started.
      </p>
      <ul style={{ lineHeight: 1.7 }}>
        <li>
          API base: <code>{baseUrl}</code>
        </li>
        <li>
          API health: <code>{apiStatus}</code>
        </li>
        <li>
          Dev servers: <code>npm run dev:all</code>
        </li>
      </ul>
    </main>
  );
}
