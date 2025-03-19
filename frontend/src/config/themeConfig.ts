export const THEMES = [
  { name: "light", label: "Light" },
  { name: "dark", label: "Dark" },
  { name: "pastel", label: "Pastel" },
  { name: "retro", label: "Retro" },
  { name: "coffee", label: "Coffee" },
  { name: "forest", label: "Forest" },
  { name: "cyberpunk", label: "Cyberpunk" },
  { name: "synthwave", label: "Synthwave" },
  { name: "luxury", label: "Luxury" },
  { name: "autumn", label: "Autumn" },
  { name: "valentine", label: "Valentine" },
  { name: "aqua", label: "Aqua" },
  { name: "business", label: "Business" },
  { name: "night", label: "Night" },
  { name: "dracula", label: "Dracula" },
];

export type ThemeName = (typeof THEMES)[number]["name"];
