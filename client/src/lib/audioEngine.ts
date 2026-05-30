export type Level = "Beginner" | "Intermediate" | "Advanced" | "All";

export function recommendAudio(resources: { level?: string; url?: string }[], preferred?: Level) {
  if (!resources || resources.length === 0) return null;
  const pref = preferred || (localStorage.getItem("ae_user_level") as Level) || "Beginner";
  const byLevel = resources.filter((r) => (r.level || "All").toLowerCase() === pref.toLowerCase());
  if (byLevel.length > 0) return byLevel[0].url || null;
  return resources[0].url || null;
}

export function setUserLevel(level: Level) {
  localStorage.setItem("ae_user_level", level);
}

export function getUserLevel(): Level {
  return (localStorage.getItem("ae_user_level") as Level) || "Beginner";
}
