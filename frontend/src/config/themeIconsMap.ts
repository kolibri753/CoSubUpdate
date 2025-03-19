import {
  Palette,
  CloudSun,
  Coffee,
  TreePine,
  Zap,
  Waves,
  Gem,
  Leaf,
  Heart,
  Droplet,
  Briefcase,
  Moon,
  Ghost,
  LucideProps,
  Sun,
  Sparkles,
} from "lucide-react";
import type { ThemeName } from "./themeConfig";

type IconType = React.FC<LucideProps>;

export const THEME_ICONS: Record<ThemeName, IconType> = {
  light: Sun,
  dark: Moon,
  pastel: Palette,
  retro: CloudSun,
  coffee: Coffee,
  forest: TreePine,
  cyberpunk: Zap,
  synthwave: Waves,
  luxury: Gem,
  autumn: Leaf,
  valentine: Heart,
  aqua: Droplet,
  business: Briefcase,
  night: Sparkles,
  dracula: Ghost,
};

export const DEFAULT_ICON = Palette;
