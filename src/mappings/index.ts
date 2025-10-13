import { layoutMappings } from "./layout";
import { flexboxGridMappings } from "./flexbox-grid";
import { spacingMappings } from "./spacing";
import { sizingMappings } from "./sizing";
import { colorsMappings } from "./colors";
import { backgroundsMappings } from "./backgrounds";
import { bordersMappings } from "./borders";
import { typographyMappings } from "./typography";
import { tablesMappings } from "./tables";
import { transitionsMappings } from "./transitions-animations";
import { transformsMappings } from "./transforms";
import { interactivityMappings } from "./interactivity";
import { effectsMappings } from "./effects";
import { filtersMappings } from "./filters";
import { positioningMappings } from "./positioning";
import { svgMappings } from "./svg";
import { accessibilityMappings } from "./accessibility";

/**
 * Combined Tailwind class mappings
 * Auto-generated from individual category modules
 */
export const tailwindMappings: Record<string, string> = {
  ...layoutMappings,
  ...flexboxGridMappings,
  ...spacingMappings,
  ...sizingMappings,
  ...colorsMappings,
  ...backgroundsMappings,
  ...bordersMappings,
  ...typographyMappings,
  ...tablesMappings,
  ...transitionsMappings,
  ...transformsMappings,
  ...interactivityMappings,
  ...effectsMappings,
  ...filtersMappings,
  ...positioningMappings,
  ...svgMappings,
  ...accessibilityMappings,
};

// Optional: Export individual mappings for testing or selective use
export {
  layoutMappings,
  flexboxGridMappings,
  spacingMappings,
  sizingMappings,
  colorsMappings,
  backgroundsMappings,
  bordersMappings,
  typographyMappings,
  tablesMappings,
  transitionsMappings,
  transformsMappings,
  interactivityMappings,
  effectsMappings,
  filtersMappings,
  positioningMappings,
  svgMappings,
  accessibilityMappings,
};

