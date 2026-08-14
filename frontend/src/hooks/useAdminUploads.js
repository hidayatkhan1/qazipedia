import { useSyncExternalStore, useMemo } from "react";
import { getUploadedItems, subscribeToUploads } from "../lib/adminStorage";
import { getAdminSection, storageKey } from "../features/admin/data/sectionsRegistry";

/**
 * Returns [...adminUploadedItems, ...staticItems] for a given
 * section + resource type, with uploaded items converted into that
 * section's exact field shape via the registry's adapt() function.
 * Falls back to just staticItems if the section isn't registered
 * (e.g. Clinical Skills, Downloads — tag-only pages with no upload flow).
 */
export function useMergedResources(sectionKey, resourceTypeSlug, staticItems) {
  const key = storageKey(sectionKey, resourceTypeSlug);

  // Re-renders whenever adminStorage.js reports a change, so a fresh
  // upload appears immediately without a page refresh.
  const uploadCount = useSyncExternalStore(
    subscribeToUploads,
    () => getUploadedItems(key).length
  );

  return useMemo(() => {
    const section = getAdminSection(sectionKey);
    if (!section) return staticItems;

    const uploaded = getUploadedItems(key).map(section.adapt);
    return [...uploaded, ...staticItems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey, key, staticItems, uploadCount]);
}
