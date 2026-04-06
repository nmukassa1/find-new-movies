/** Same deterministic year as the home “Best of {year}” section (changes daily). */
export function getHomeFeatureYear(): number {
  const startYear = 1990;
  const endYear = new Date().getFullYear();
  const today = new Date();
  const seedStr = today.toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const yearRange = endYear - startYear + 1;
  const pseudoRandom = Math.abs(hash) % yearRange;
  return startYear + pseudoRandom;
}
