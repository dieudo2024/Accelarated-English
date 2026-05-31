export function toEmbedUrl(input: string | undefined | null): string | null {
  if (!input) return null;
  try {
    const u = new URL(input);
    // youtube watch -> embed
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith('/embed/')) return input;
    }
    // youtu.be short link
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // if it's already an embed url, return it
    if (input.includes('/embed/')) return input;
  } catch (e) {
    // not a URL — ignore
  }
  return null;
}
