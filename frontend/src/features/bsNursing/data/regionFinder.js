import { regions as kmuResultsRegions } from "../../results/data/regions";

// Every institute in results/regions.js offers "BS Nursing" on its
// nursing track by design (see that file's comment), so this
// currently returns all 7 regions - but it's derived from the real
// data rather than hardcoded, so if a future institute is added
// without a nursing program, it correctly drops out here too.
export const nursingRegions = kmuResultsRegions
  .map((region) => ({
    slug: region.slug,
    name: region.name,
    institutes: region.institutes.filter((i) =>
      i.programsByTrack.nursing.includes("BS Nursing")
    ),
  }))
  .filter((region) => region.institutes.length > 0);

export function getNursingRegion(slug) {
  return nursingRegions.find((r) => r.slug === slug);
}
