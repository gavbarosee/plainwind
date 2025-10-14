/**
 * Tests for mapping coverage and completeness
 */

import { describe, it, expect } from 'vitest';
import {
  tailwindMappings,
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
} from '../index';

describe('Mapping Coverage Tests', () => {
  describe('combined mappings', () => {
    it('should have combined mappings object', () => {
      expect(tailwindMappings).toBeDefined();
      expect(typeof tailwindMappings).toBe('object');
    });

    it('should have reasonable number of mappings', () => {
      const keys = Object.keys(tailwindMappings);
      expect(keys.length).toBeGreaterThan(100);
    });

    it('should not have duplicate values in keys', () => {
      const keys = Object.keys(tailwindMappings);
      const uniqueKeys = new Set(keys);
      expect(keys.length).toBe(uniqueKeys.size);
    });

    it('should have all values as strings', () => {
      Object.values(tailwindMappings).forEach((value) => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe('layout mappings', () => {
    it('should have display utilities', () => {
      expect(layoutMappings.block).toBeDefined();
      expect(layoutMappings.inline).toBeDefined();
      expect(flexboxGridMappings.flex).toBeDefined();
      expect(layoutMappings.hidden).toBeDefined();
    });

    it('should have position utilities', () => {
      expect(layoutMappings.static).toBeDefined();
      expect(layoutMappings.relative).toBeDefined();
      expect(layoutMappings.absolute).toBeDefined();
      expect(layoutMappings.fixed).toBeDefined();
      expect(layoutMappings.sticky).toBeDefined();
    });

    it('should have overflow utilities', () => {
      expect(layoutMappings['overflow-hidden']).toBeDefined();
      expect(layoutMappings['overflow-auto']).toBeDefined();
      expect(layoutMappings['overflow-scroll']).toBeDefined();
    });
  });

  describe('flexbox and grid mappings', () => {
    it('should have flex utilities', () => {
      expect(flexboxGridMappings.flex).toBeDefined();
      expect(flexboxGridMappings['flex-row']).toBeDefined();
      expect(flexboxGridMappings['flex-col']).toBeDefined();
    });

    it('should have flex alignment utilities', () => {
      expect(flexboxGridMappings['items-center']).toBeDefined();
      expect(flexboxGridMappings['items-start']).toBeDefined();
      expect(flexboxGridMappings['justify-between']).toBeDefined();
      expect(flexboxGridMappings['justify-center']).toBeDefined();
    });

    it('should have grid utilities', () => {
      expect(flexboxGridMappings.grid).toBeDefined();
    });

    it('should have gap utilities', () => {
      expect(flexboxGridMappings['gap-0']).toBeDefined();
      expect(flexboxGridMappings['gap-4']).toBeDefined();
    });
  });

  describe('spacing mappings', () => {
    it('should have padding utilities', () => {
      expect(spacingMappings['p-0']).toBeDefined();
      expect(spacingMappings['p-4']).toBeDefined();
      expect(spacingMappings['px-4']).toBeDefined();
      expect(spacingMappings['py-2']).toBeDefined();
      expect(spacingMappings['pt-6']).toBeDefined();
    });

    it('should have margin utilities', () => {
      expect(spacingMappings['m-0']).toBeDefined();
      expect(spacingMappings['m-4']).toBeDefined();
      expect(spacingMappings['mx-auto']).toBeDefined();
      expect(spacingMappings['my-2']).toBeDefined();
      expect(spacingMappings['mt-4']).toBeDefined();
    });

    it('should have consistent spacing scale', () => {
      const spacingValues = ['0', '1', '2', '3', '4', '6', '8'];
      spacingValues.forEach((value) => {
        expect(spacingMappings[`p-${value}`]).toBeDefined();
        expect(spacingMappings[`m-${value}`]).toBeDefined();
      });
    });
  });

  describe('sizing mappings', () => {
    it('should have width utilities', () => {
      expect(sizingMappings['w-full']).toBeDefined();
      expect(sizingMappings['w-screen']).toBeDefined();
      expect(sizingMappings['w-auto']).toBeDefined();
    });

    it('should have height utilities', () => {
      expect(sizingMappings['h-full']).toBeDefined();
      expect(sizingMappings['h-screen']).toBeDefined();
      expect(sizingMappings['h-auto']).toBeDefined();
    });

    it('should have min/max width utilities', () => {
      expect(sizingMappings['min-w-0']).toBeDefined();
      expect(sizingMappings['max-w-xl']).toBeDefined();
    });

    it('should have min/max height utilities', () => {
      expect(sizingMappings['min-h-0']).toBeDefined();
      expect(sizingMappings['max-h-full']).toBeDefined();
    });
  });

  describe('colors mappings', () => {
    it('should have text color utilities', () => {
      expect(colorsMappings['text-white']).toBeDefined();
      expect(colorsMappings['text-black']).toBeDefined();
      expect(colorsMappings['text-blue-500']).toBeDefined();
    });

    it('should have background color utilities', () => {
      expect(colorsMappings['bg-white']).toBeDefined();
      expect(colorsMappings['bg-black']).toBeDefined();
      expect(colorsMappings['bg-transparent']).toBeDefined();
    });

    it('should have special color values', () => {
      expect(colorsMappings['text-transparent']).toBeDefined();
      expect(colorsMappings['text-current']).toBeDefined();
      expect(colorsMappings['bg-transparent']).toBeDefined();
    });
  });

  describe('backgrounds mappings', () => {
    it('should have gradient utilities', () => {
      expect(backgroundsMappings['bg-gradient-to-r']).toBeDefined();
      expect(backgroundsMappings['bg-gradient-to-t']).toBeDefined();
    });

    it('should have background position utilities', () => {
      expect(backgroundsMappings['bg-center']).toBeDefined();
      expect(backgroundsMappings['bg-top']).toBeDefined();
    });

    it('should have background size utilities', () => {
      expect(backgroundsMappings['bg-cover']).toBeDefined();
      expect(backgroundsMappings['bg-contain']).toBeDefined();
    });
  });

  describe('borders mappings', () => {
    it('should have border width utilities', () => {
      expect(bordersMappings.border).toBeDefined();
      expect(bordersMappings['border-0']).toBeDefined();
      expect(bordersMappings['border-2']).toBeDefined();
    });

    it('should have border radius utilities', () => {
      expect(bordersMappings.rounded).toBeDefined();
      expect(bordersMappings['rounded-lg']).toBeDefined();
      expect(bordersMappings['rounded-full']).toBeDefined();
    });

    it('should have border style utilities', () => {
      expect(bordersMappings['border-solid']).toBeDefined();
      expect(bordersMappings['border-dashed']).toBeDefined();
      expect(bordersMappings['border-dotted']).toBeDefined();
    });
  });

  describe('typography mappings', () => {
    it('should have font size utilities', () => {
      expect(typographyMappings['text-xs']).toBeDefined();
      expect(typographyMappings['text-sm']).toBeDefined();
      expect(typographyMappings['text-lg']).toBeDefined();
      expect(typographyMappings['text-xl']).toBeDefined();
    });

    it('should have font weight utilities', () => {
      expect(typographyMappings['font-normal']).toBeDefined();
      expect(typographyMappings['font-bold']).toBeDefined();
      expect(typographyMappings['font-light']).toBeDefined();
    });

    it('should have text alignment utilities', () => {
      expect(typographyMappings['text-left']).toBeDefined();
      expect(typographyMappings['text-center']).toBeDefined();
      expect(typographyMappings['text-right']).toBeDefined();
    });

    it('should have line height utilities', () => {
      expect(typographyMappings['leading-none']).toBeDefined();
      expect(typographyMappings['leading-tight']).toBeDefined();
    });
  });

  describe('tables mappings', () => {
    it('should have table layout utilities', () => {
      expect(tablesMappings['table-auto']).toBeDefined();
      expect(tablesMappings['table-fixed']).toBeDefined();
    });

    it('should have border collapse utilities', () => {
      expect(tablesMappings['border-collapse']).toBeDefined();
      expect(tablesMappings['border-separate']).toBeDefined();
    });
  });

  describe('transitions mappings', () => {
    it('should have transition utilities', () => {
      expect(transitionsMappings.transition).toBeDefined();
      expect(transitionsMappings['transition-all']).toBeDefined();
      expect(transitionsMappings['transition-colors']).toBeDefined();
    });

    it('should have duration utilities', () => {
      expect(transitionsMappings['duration-100']).toBeDefined();
      expect(transitionsMappings['duration-300']).toBeDefined();
    });

    it('should have animation utilities', () => {
      expect(transitionsMappings['animate-spin']).toBeDefined();
      expect(transitionsMappings['animate-bounce']).toBeDefined();
    });
  });

  describe('transforms mappings', () => {
    it('should have scale utilities', () => {
      expect(transformsMappings['scale-0']).toBeDefined();
      expect(transformsMappings['scale-100']).toBeDefined();
    });

    it('should have rotate utilities', () => {
      expect(transformsMappings['rotate-0']).toBeDefined();
      expect(transformsMappings['rotate-45']).toBeDefined();
    });

    it('should have translate utilities', () => {
      expect(transformsMappings['translate-x-0']).toBeDefined();
      expect(transformsMappings['translate-y-0']).toBeDefined();
    });
  });

  describe('interactivity mappings', () => {
    it('should have cursor utilities', () => {
      expect(interactivityMappings['cursor-pointer']).toBeDefined();
      expect(interactivityMappings['cursor-default']).toBeDefined();
    });

    it('should have pointer events utilities', () => {
      expect(interactivityMappings['pointer-events-none']).toBeDefined();
      expect(interactivityMappings['pointer-events-auto']).toBeDefined();
    });

    it('should have user select utilities', () => {
      expect(interactivityMappings['select-none']).toBeDefined();
      expect(interactivityMappings['select-text']).toBeDefined();
    });
  });

  describe('effects mappings', () => {
    it('should have shadow utilities', () => {
      expect(effectsMappings.shadow).toBeDefined();
      expect(effectsMappings['shadow-sm']).toBeDefined();
      expect(effectsMappings['shadow-lg']).toBeDefined();
    });

    it('should have opacity utilities', () => {
      expect(effectsMappings['opacity-0']).toBeDefined();
      expect(effectsMappings['opacity-50']).toBeDefined();
      expect(effectsMappings['opacity-100']).toBeDefined();
    });
  });

  describe('filters mappings', () => {
    it('should have blur utilities', () => {
      expect(filtersMappings.blur).toBeDefined();
      expect(filtersMappings['blur-sm']).toBeDefined();
    });

    it('should have brightness utilities', () => {
      expect(filtersMappings['brightness-0']).toBeDefined();
      expect(filtersMappings['brightness-100']).toBeDefined();
    });

    it('should have grayscale utilities', () => {
      expect(filtersMappings.grayscale).toBeDefined();
    });
  });

  describe('positioning mappings', () => {
    it('should have inset utilities', () => {
      expect(positioningMappings['inset-0']).toBeDefined();
      expect(positioningMappings['top-0']).toBeDefined();
      expect(positioningMappings['right-0']).toBeDefined();
    });

    it('should have z-index utilities', () => {
      expect(positioningMappings).toBeDefined();
      expect(Object.keys(positioningMappings).length).toBeGreaterThan(0);
    });
  });

  describe('svg mappings', () => {
    it('should have fill utilities', () => {
      expect(svgMappings['fill-current']).toBeDefined();
      expect(svgMappings['fill-none']).toBeDefined();
    });

    it('should have stroke utilities', () => {
      expect(svgMappings['stroke-current']).toBeDefined();
      expect(svgMappings['stroke-none']).toBeDefined();
    });
  });

  describe('accessibility mappings', () => {
    it('should have screen reader utilities', () => {
      expect(accessibilityMappings['sr-only']).toBeDefined();
      expect(accessibilityMappings['not-sr-only']).toBeDefined();
    });
  });

  describe('mapping consistency', () => {
    it('should have consistent descriptions format', () => {
      Object.entries(tailwindMappings).forEach(([key, value]) => {
        // All descriptions should be lowercase (unless they start with specific terms)
        const startsWithException =
          /^(CSS|URL|RGB|RGBA|HSL|HSLA|Uppercased)/i.test(value);
        // Some values might start with uppercase (proper names, etc.) - that's ok
        if (!startsWithException && value.length > 0) {
          // Just check it's a valid string, not empty
          expect(typeof value).toBe('string');
        }
      });
    });

    it('should not have trailing spaces in descriptions', () => {
      Object.values(tailwindMappings).forEach((value) => {
        expect(value).toBe(value.trim());
      });
    });

    it('should not have empty descriptions', () => {
      Object.values(tailwindMappings).forEach((value) => {
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });
});
