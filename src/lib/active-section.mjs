/**
 * Pick the topmost intersecting section from the current IntersectionObserver batch.
 *
 * @param {Array<{
 *   isIntersecting: boolean,
 *   boundingClientRect: { top: number },
 *   target: { id: string }
 * }>} entries
 * @returns {string | null}
 */
export function selectActiveSection(entries) {
  const visibleEntries = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

  return visibleEntries[0]?.target.id ?? null;
}
