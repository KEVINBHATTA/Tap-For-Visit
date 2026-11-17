export const SELECTED_PROFILE_KEY = "tfv-selected-profile";

export function getTemplateForProfileId(profileId) {
  if (profileId === "t1") return "template1";
  if (profileId === "t2") return "template2";
  return null;
}

export function getSelectedProfileTemplate() {
  try {
    const raw = sessionStorage.getItem(SELECTED_PROFILE_KEY);
    if (!raw) return null;
    return getTemplateForProfileId(JSON.parse(raw)?._id);
  } catch (error) {
    console.error("Could not read selected profile template:", error);
    return null;
  }
}
