export async function register() {
  if (typeof window === 'undefined') {
    // Node 22+ exposes a global localStorage that throws because --localstorage-file
    // is not configured. Patch it with a no-op so SSR dependencies don't crash.
    const g = globalThis as Record<string, unknown>;
    if (g.localStorage && typeof (g.localStorage as Record<string, unknown>).getItem !== 'function') {
      const noop = () => null;
      g.localStorage = {
        getItem: noop,
        setItem: noop,
        removeItem: noop,
        clear: noop,
        key: noop,
        length: 0,
      };
    }
  }
}