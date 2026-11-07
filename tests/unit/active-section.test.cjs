const assert = require('node:assert/strict');
const { before, test } = require('node:test');

let selectActiveSection;

before(async () => {
  ({ selectActiveSection } = await import('../../src/lib/active-section.mjs'));
});

function observerEntry(id, top, isIntersecting = true) {
  return {
    isIntersecting,
    boundingClientRect: { top },
    target: { id },
  };
}

test('selects the intersecting section closest to the top of the viewport', () => {
  const entries = [
    observerEntry('work', 320),
    observerEntry('about', 120),
    observerEntry('journey', 510),
  ];

  assert.equal(selectActiveSection(entries), 'about');
});

test('ignores entries that are not intersecting', () => {
  const entries = [
    observerEntry('home', 10, false),
    observerEntry('skills', 210, true),
  ];

  assert.equal(selectActiveSection(entries), 'skills');
});

test('returns null when no entry intersects', () => {
  const entries = [
    observerEntry('home', 10, false),
    observerEntry('about', 120, false),
  ];

  assert.equal(selectActiveSection(entries), null);
});

test('does not mutate the observer entries array', () => {
  const entries = [
    observerEntry('work', 320),
    observerEntry('about', 120),
  ];
  const originalOrder = entries.map((entry) => entry.target.id);

  selectActiveSection(entries);

  assert.deepEqual(entries.map((entry) => entry.target.id), originalOrder);
});
