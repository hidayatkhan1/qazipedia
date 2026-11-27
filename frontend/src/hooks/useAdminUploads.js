import { useEffect, useMemo, useSyncExternalStore } from "react";
import { getUploadsVersion, loadUploads, subscribeToUploads, getUploadedItems } from "../lib/adminStorage";
import { getAdminSection, storageKey } from "../features/admin/data/sectionsRegistry";

/**
 * Returns [...adminUploadedItems, ...staticItems] for a given
 * section + resource type, with uploaded items converted into that
 * section's exact field shape via the registry's adapt() function.
 * Falls back to just staticItems if the section isn't registered.
 *
 * In Supabase mode the uploads are fetched once per section (in the
 * effect below) and the page re-renders when they arrive, so visitors
 * see the built-in content immediately and uploads appear a moment later.
 */
export function useMergedResources(sectionKey, resourceTypeSlug, staticItems) {
  const key = storageKey(sectionKey, resourceTypeSlug);

  // Re-render whenever adminStorage reports a change (new upload, load finished).
  const version = useSyncExternalStore(subscribeToUploads, getUploadsVersion);

  useEffect(() => {
    if (getAdminSection(sectionKey)) loadUploads(key);
  }, [sectionKey, key]);

  return useMemo(() => {
    const section = getAdminSection(sectionKey);
    if (!section) return staticItems;

    const uploaded = getUploadedItems(key).map(section.adapt);
    return [...uploaded, ...staticItems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey, key, staticItems, version]);
}
