/**
 * Transforms pattern matchers
 */

export function matchTransformPattern(className: string): string | null {
  // transform-(<custom-property>) - custom CSS property for transform
  const customPropMatch = className.match(/^transform-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `transform ${customPropMatch[1]}`;
  }

  // transform-[value] - arbitrary transform value
  const arbitraryMatch = className.match(/^transform-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `transform ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match transform-origin patterns (origin-*)
 */

export function matchRotatePattern(className: string): string | null {
  // rotate-x-(<custom-property>) - custom CSS property for X-axis rotation
  const rotateXCustomPropMatch = className.match(/^rotate-x-\((--[\w-]+)\)$/);
  if (rotateXCustomPropMatch) {
    return `rotate around horizontal axis ${rotateXCustomPropMatch[1]}`;
  }

  // rotate-y-(<custom-property>) - custom CSS property for Y-axis rotation
  const rotateYCustomPropMatch = className.match(/^rotate-y-\((--[\w-]+)\)$/);
  if (rotateYCustomPropMatch) {
    return `rotate around vertical axis ${rotateYCustomPropMatch[1]}`;
  }

  // rotate-z-(<custom-property>) - custom CSS property for Z-axis rotation
  const rotateZCustomPropMatch = className.match(/^rotate-z-\((--[\w-]+)\)$/);
  if (rotateZCustomPropMatch) {
    return `rotate in depth ${rotateZCustomPropMatch[1]}`;
  }

  // rotate-(<custom-property>) - custom CSS property for rotation
  const customPropMatch = className.match(/^rotate-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `rotate ${customPropMatch[1]}`;
  }

  // rotate-x-[value] - arbitrary X-axis rotation value
  const rotateXArbitraryMatch = className.match(/^rotate-x-\[(.+?)\]$/);
  if (rotateXArbitraryMatch) {
    return `rotate around horizontal axis ${rotateXArbitraryMatch[1]}`;
  }

  // rotate-y-[value] - arbitrary Y-axis rotation value
  const rotateYArbitraryMatch = className.match(/^rotate-y-\[(.+?)\]$/);
  if (rotateYArbitraryMatch) {
    return `rotate around vertical axis ${rotateYArbitraryMatch[1]}`;
  }

  // rotate-z-[value] - arbitrary Z-axis rotation value
  const rotateZArbitraryMatch = className.match(/^rotate-z-\[(.+?)\]$/);
  if (rotateZArbitraryMatch) {
    return `rotate in depth ${rotateZArbitraryMatch[1]}`;
  }

  // rotate-[value] - arbitrary rotation value
  const arbitraryMatch = className.match(/^rotate-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `rotate ${arbitraryMatch[1]}`;
  }

  // -rotate-x-<number> - negative X-axis rotation in degrees
  const negativeRotateXMatch = className.match(/^-rotate-x-(\d+(?:\.\d+)?)$/);
  if (negativeRotateXMatch) {
    return `rotate -${negativeRotateXMatch[1]}° around horizontal axis`;
  }

  // -rotate-y-<number> - negative Y-axis rotation in degrees
  const negativeRotateYMatch = className.match(/^-rotate-y-(\d+(?:\.\d+)?)$/);
  if (negativeRotateYMatch) {
    return `rotate -${negativeRotateYMatch[1]}° around vertical axis`;
  }

  // -rotate-z-<number> - negative Z-axis rotation in degrees
  const negativeRotateZMatch = className.match(/^-rotate-z-(\d+(?:\.\d+)?)$/);
  if (negativeRotateZMatch) {
    return `rotate -${negativeRotateZMatch[1]}° in depth`;
  }

  // -rotate-<number> - negative rotation in degrees
  const negativeMatch = className.match(/^-rotate-(\d+(?:\.\d+)?)$/);
  if (negativeMatch) {
    return `rotate -${negativeMatch[1]}°`;
  }

  // rotate-x-<number> - X-axis rotation in degrees
  const rotateXMatch = className.match(/^rotate-x-(\d+(?:\.\d+)?)$/);
  if (rotateXMatch) {
    return `rotate ${rotateXMatch[1]}° around horizontal axis`;
  }

  // rotate-y-<number> - Y-axis rotation in degrees
  const rotateYMatch = className.match(/^rotate-y-(\d+(?:\.\d+)?)$/);
  if (rotateYMatch) {
    return `rotate ${rotateYMatch[1]}° around vertical axis`;
  }

  // rotate-z-<number> - Z-axis rotation in degrees
  const rotateZMatch = className.match(/^rotate-z-(\d+(?:\.\d+)?)$/);
  if (rotateZMatch) {
    return `rotate ${rotateZMatch[1]}° in depth`;
  }

  // rotate-<number> - rotation in degrees
  const numberMatch = className.match(/^rotate-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    return `rotate ${numberMatch[1]}°`;
  }

  return null;
}

/**
 * Try to match perspective patterns (perspective-*)
 */

export function matchScalePattern(className: string): string | null {
  // scale-x-(<custom-property>) - custom CSS property for X-axis scale
  const scaleXCustomPropMatch = className.match(/^scale-x-\((--[\w-]+)\)$/);
  if (scaleXCustomPropMatch) {
    return `scale horizontally ${scaleXCustomPropMatch[1]}`;
  }

  // scale-y-(<custom-property>) - custom CSS property for Y-axis scale
  const scaleYCustomPropMatch = className.match(/^scale-y-\((--[\w-]+)\)$/);
  if (scaleYCustomPropMatch) {
    return `scale vertically ${scaleYCustomPropMatch[1]}`;
  }

  // scale-z-(<custom-property>) - custom CSS property for Z-axis scale
  const scaleZCustomPropMatch = className.match(/^scale-z-\((--[\w-]+)\)$/);
  if (scaleZCustomPropMatch) {
    return `scale in depth ${scaleZCustomPropMatch[1]}`;
  }

  // scale-(<custom-property>) - custom CSS property for scale
  const customPropMatch = className.match(/^scale-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `scale ${customPropMatch[1]}`;
  }

  // scale-x-[value] - arbitrary X-axis scale value
  const scaleXArbitraryMatch = className.match(/^scale-x-\[(.+?)\]$/);
  if (scaleXArbitraryMatch) {
    return `scale horizontally ${scaleXArbitraryMatch[1]}`;
  }

  // scale-y-[value] - arbitrary Y-axis scale value
  const scaleYArbitraryMatch = className.match(/^scale-y-\[(.+?)\]$/);
  if (scaleYArbitraryMatch) {
    return `scale vertically ${scaleYArbitraryMatch[1]}`;
  }

  // scale-z-[value] - arbitrary Z-axis scale value
  const scaleZArbitraryMatch = className.match(/^scale-z-\[(.+?)\]$/);
  if (scaleZArbitraryMatch) {
    return `scale in depth ${scaleZArbitraryMatch[1]}`;
  }

  // scale-[value] - arbitrary scale value
  const arbitraryMatch = className.match(/^scale-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `scale ${arbitraryMatch[1]}`;
  }

  // -scale-x-<number> - negative X-axis scale percentage
  const negativeScaleXMatch = className.match(/^-scale-x-(\d+(?:\.\d+)?)$/);
  if (negativeScaleXMatch) {
    return `scale horizontally to -${negativeScaleXMatch[1]}%`;
  }

  // -scale-y-<number> - negative Y-axis scale percentage
  const negativeScaleYMatch = className.match(/^-scale-y-(\d+(?:\.\d+)?)$/);
  if (negativeScaleYMatch) {
    return `scale vertically to -${negativeScaleYMatch[1]}%`;
  }

  // -scale-z-<number> - negative Z-axis scale percentage
  const negativeScaleZMatch = className.match(/^-scale-z-(\d+(?:\.\d+)?)$/);
  if (negativeScaleZMatch) {
    return `scale in depth to -${negativeScaleZMatch[1]}%`;
  }

  // -scale-<number> - negative scale percentage
  const negativeMatch = className.match(/^-scale-(\d+(?:\.\d+)?)$/);
  if (negativeMatch) {
    return `scale to -${negativeMatch[1]}%`;
  }

  // scale-x-<number> - X-axis scale percentage
  const scaleXMatch = className.match(/^scale-x-(\d+(?:\.\d+)?)$/);
  if (scaleXMatch) {
    return `scale horizontally to ${scaleXMatch[1]}%`;
  }

  // scale-y-<number> - Y-axis scale percentage
  const scaleYMatch = className.match(/^scale-y-(\d+(?:\.\d+)?)$/);
  if (scaleYMatch) {
    return `scale vertically to ${scaleYMatch[1]}%`;
  }

  // scale-z-<number> - Z-axis scale percentage
  const scaleZMatch = className.match(/^scale-z-(\d+(?:\.\d+)?)$/);
  if (scaleZMatch) {
    return `scale in depth to ${scaleZMatch[1]}%`;
  }

  // scale-<number> - scale percentage
  const numberMatch = className.match(/^scale-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    return `scale to ${numberMatch[1]}%`;
  }

  return null;
}

/**
 * Try to match rotate patterns (rotate-*, rotate-x-*, rotate-y-*, rotate-z-*)
 */

export function matchSkewPattern(className: string): string | null {
  // skew-x-(<custom-property>) - custom CSS property for X-axis skew
  const skewXCustomPropMatch = className.match(/^skew-x-\((--[\w-]+)\)$/);
  if (skewXCustomPropMatch) {
    return `skew horizontally ${skewXCustomPropMatch[1]}`;
  }

  // skew-y-(<custom-property>) - custom CSS property for Y-axis skew
  const skewYCustomPropMatch = className.match(/^skew-y-\((--[\w-]+)\)$/);
  if (skewYCustomPropMatch) {
    return `skew vertically ${skewYCustomPropMatch[1]}`;
  }

  // skew-(<custom-property>) - custom CSS property for both axes skew
  const customPropMatch = className.match(/^skew-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `skew horizontally and vertically ${customPropMatch[1]}`;
  }

  // skew-x-[value] - arbitrary X-axis skew value
  const skewXArbitraryMatch = className.match(/^skew-x-\[(.+?)\]$/);
  if (skewXArbitraryMatch) {
    return `skew horizontally ${skewXArbitraryMatch[1]}`;
  }

  // skew-y-[value] - arbitrary Y-axis skew value
  const skewYArbitraryMatch = className.match(/^skew-y-\[(.+?)\]$/);
  if (skewYArbitraryMatch) {
    return `skew vertically ${skewYArbitraryMatch[1]}`;
  }

  // skew-[value] - arbitrary both axes skew value
  const arbitraryMatch = className.match(/^skew-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `skew horizontally and vertically ${arbitraryMatch[1]}`;
  }

  // -skew-x-<number> - negative X-axis skew in degrees
  const negativeSkewXMatch = className.match(/^-skew-x-(\d+(?:\.\d+)?)$/);
  if (negativeSkewXMatch) {
    return `skew horizontally -${negativeSkewXMatch[1]}°`;
  }

  // -skew-y-<number> - negative Y-axis skew in degrees
  const negativeSkewYMatch = className.match(/^-skew-y-(\d+(?:\.\d+)?)$/);
  if (negativeSkewYMatch) {
    return `skew vertically -${negativeSkewYMatch[1]}°`;
  }

  // -skew-<number> - negative both axes skew in degrees
  const negativeMatch = className.match(/^-skew-(\d+(?:\.\d+)?)$/);
  if (negativeMatch) {
    return `skew -${negativeMatch[1]}° horizontally and vertically`;
  }

  // skew-x-<number> - X-axis skew in degrees
  const skewXMatch = className.match(/^skew-x-(\d+(?:\.\d+)?)$/);
  if (skewXMatch) {
    return `skew horizontally ${skewXMatch[1]}°`;
  }

  // skew-y-<number> - Y-axis skew in degrees
  const skewYMatch = className.match(/^skew-y-(\d+(?:\.\d+)?)$/);
  if (skewYMatch) {
    return `skew vertically ${skewYMatch[1]}°`;
  }

  // skew-<number> - both axes skew in degrees
  const numberMatch = className.match(/^skew-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    return `skew ${numberMatch[1]}° horizontally and vertically`;
  }

  return null;
}

/**
 * Try to match scale patterns (scale-*, scale-x-*, scale-y-*, scale-z-*)
 */

export function matchTranslatePattern(className: string): string | null {
  // translate-x-(<custom-property>) - custom CSS property for X-axis translation
  const translateXCustomPropMatch = className.match(
    /^translate-x-\((--[\w-]+)\)$/
  );
  if (translateXCustomPropMatch) {
    return `translate horizontally ${translateXCustomPropMatch[1]}`;
  }

  // translate-y-(<custom-property>) - custom CSS property for Y-axis translation
  const translateYCustomPropMatch = className.match(
    /^translate-y-\((--[\w-]+)\)$/
  );
  if (translateYCustomPropMatch) {
    return `translate vertically ${translateYCustomPropMatch[1]}`;
  }

  // translate-z-(<custom-property>) - custom CSS property for Z-axis translation
  const translateZCustomPropMatch = className.match(
    /^translate-z-\((--[\w-]+)\)$/
  );
  if (translateZCustomPropMatch) {
    return `move in depth ${translateZCustomPropMatch[1]}`;
  }

  // translate-(<custom-property>) - custom CSS property for both axes translation
  const customPropMatch = className.match(/^translate-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `move horizontally and vertically ${customPropMatch[1]}`;
  }

  // translate-x-[value] - arbitrary X-axis translation value
  const translateXArbitraryMatch = className.match(/^translate-x-\[(.+?)\]$/);
  if (translateXArbitraryMatch) {
    return `translate horizontally ${translateXArbitraryMatch[1]}`;
  }

  // translate-y-[value] - arbitrary Y-axis translation value
  const translateYArbitraryMatch = className.match(/^translate-y-\[(.+?)\]$/);
  if (translateYArbitraryMatch) {
    return `translate vertically ${translateYArbitraryMatch[1]}`;
  }

  // translate-z-[value] - arbitrary Z-axis translation value
  const translateZArbitraryMatch = className.match(/^translate-z-\[(.+?)\]$/);
  if (translateZArbitraryMatch) {
    return `move in depth ${translateZArbitraryMatch[1]}`;
  }

  // translate-[value] - arbitrary both axes translation value
  const arbitraryMatch = className.match(/^translate-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `move horizontally and vertically ${arbitraryMatch[1]}`;
  }

  // -translate-x-<fraction> - negative X-axis translation fraction
  const negativeTranslateXFractionMatch = className.match(
    /^-translate-x-(\d+)\/(\d+)$/
  );
  if (negativeTranslateXFractionMatch) {
    const percentage = (
      (parseFloat(negativeTranslateXFractionMatch[1]) /
        parseFloat(negativeTranslateXFractionMatch[2])) *
      100
    ).toFixed(3);
    return `translate horizontally -${percentage}%`;
  }

  // -translate-y-<fraction> - negative Y-axis translation fraction
  const negativeTranslateYFractionMatch = className.match(
    /^-translate-y-(\d+)\/(\d+)$/
  );
  if (negativeTranslateYFractionMatch) {
    const percentage = (
      (parseFloat(negativeTranslateYFractionMatch[1]) /
        parseFloat(negativeTranslateYFractionMatch[2])) *
      100
    ).toFixed(3);
    return `translate vertically -${percentage}%`;
  }

  // -translate-<fraction> - negative both axes translation fraction
  const negativeTranslateFractionMatch = className.match(
    /^-translate-(\d+)\/(\d+)$/
  );
  if (negativeTranslateFractionMatch) {
    const percentage = (
      (parseFloat(negativeTranslateFractionMatch[1]) /
        parseFloat(negativeTranslateFractionMatch[2])) *
      100
    ).toFixed(3);
    return `move -${percentage}% horizontally and vertically`;
  }

  // -translate-x-<number> - negative X-axis translation in spacing scale
  const negativeTranslateXMatch = className.match(
    /^-translate-x-(\d+(?:\.\d+)?)$/
  );
  if (negativeTranslateXMatch) {
    return `translate horizontally -${negativeTranslateXMatch[1]} (spacing scale)`;
  }

  // -translate-y-<number> - negative Y-axis translation in spacing scale
  const negativeTranslateYMatch = className.match(
    /^-translate-y-(\d+(?:\.\d+)?)$/
  );
  if (negativeTranslateYMatch) {
    return `translate vertically -${negativeTranslateYMatch[1]} (spacing scale)`;
  }

  // -translate-z-<number> - negative Z-axis translation in spacing scale
  const negativeTranslateZMatch = className.match(
    /^-translate-z-(\d+(?:\.\d+)?)$/
  );
  if (negativeTranslateZMatch) {
    return `move in depth -${negativeTranslateZMatch[1]} (spacing scale)`;
  }

  // -translate-<number> - negative both axes translation in spacing scale
  const negativeTranslateMatch = className.match(
    /^-translate-(\d+(?:\.\d+)?)$/
  );
  if (negativeTranslateMatch) {
    return `move -${negativeTranslateMatch[1]} horizontally and vertically (spacing scale)`;
  }

  // translate-x-<fraction> - X-axis translation fraction
  const translateXFractionMatch = className.match(/^translate-x-(\d+)\/(\d+)$/);
  if (translateXFractionMatch) {
    const percentage = (
      (parseFloat(translateXFractionMatch[1]) /
        parseFloat(translateXFractionMatch[2])) *
      100
    ).toFixed(3);
    return `translate horizontally ${percentage}%`;
  }

  // translate-y-<fraction> - Y-axis translation fraction
  const translateYFractionMatch = className.match(/^translate-y-(\d+)\/(\d+)$/);
  if (translateYFractionMatch) {
    const percentage = (
      (parseFloat(translateYFractionMatch[1]) /
        parseFloat(translateYFractionMatch[2])) *
      100
    ).toFixed(3);
    return `translate vertically ${percentage}%`;
  }

  // translate-<fraction> - both axes translation fraction
  const translateFractionMatch = className.match(/^translate-(\d+)\/(\d+)$/);
  if (translateFractionMatch) {
    const percentage = (
      (parseFloat(translateFractionMatch[1]) /
        parseFloat(translateFractionMatch[2])) *
      100
    ).toFixed(3);
    return `move ${percentage}% horizontally and vertically`;
  }

  // translate-x-<number> - X-axis translation in spacing scale
  const translateXMatch = className.match(/^translate-x-(\d+(?:\.\d+)?)$/);
  if (translateXMatch) {
    return `translate horizontally ${translateXMatch[1]} (spacing scale)`;
  }

  // translate-y-<number> - Y-axis translation in spacing scale
  const translateYMatch = className.match(/^translate-y-(\d+(?:\.\d+)?)$/);
  if (translateYMatch) {
    return `translate vertically ${translateYMatch[1]} (spacing scale)`;
  }

  // translate-z-<number> - Z-axis translation in spacing scale
  const translateZMatch = className.match(/^translate-z-(\d+(?:\.\d+)?)$/);
  if (translateZMatch) {
    return `move in depth ${translateZMatch[1]} (spacing scale)`;
  }

  // translate-<number> - both axes translation in spacing scale
  const translateMatch = className.match(/^translate-(\d+(?:\.\d+)?)$/);
  if (translateMatch) {
    return `move ${translateMatch[1]} horizontally and vertically (spacing scale)`;
  }

  return null;
}

/**
 * Try to match transform patterns (transform-*)
 */

export function matchTransformOriginPattern(className: string): string | null {
  // origin-(<custom-property>) - custom CSS property for transform origin
  const customPropMatch = className.match(/^origin-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `transform origin ${customPropMatch[1]}`;
  }

  // origin-[value] - arbitrary transform origin value
  const arbitraryMatch = className.match(/^origin-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `transform origin ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match skew patterns (skew-*, skew-x-*, skew-y-*)
 */

export function matchPerspectivePattern(className: string): string | null {
  // perspective-(<custom-property>) - custom CSS property for perspective
  const customPropMatch = className.match(/^perspective-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `perspective ${customPropMatch[1]}`;
  }

  // perspective-[value] - arbitrary perspective value
  const arbitraryMatch = className.match(/^perspective-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `perspective ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match perspective-origin patterns (perspective-origin-*)
 */

export function matchPerspectiveOriginPattern(
  className: string
): string | null {
  // perspective-origin-(<custom-property>) - custom CSS property for perspective origin
  const customPropMatch = className.match(
    /^perspective-origin-\((--[\w-]+)\)$/
  );
  if (customPropMatch) {
    return `perspective origin ${customPropMatch[1]}`;
  }

  // perspective-origin-[value] - arbitrary perspective origin value
  const arbitraryMatch = className.match(/^perspective-origin-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `perspective origin ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match border-spacing patterns (border-spacing-*)
 */
