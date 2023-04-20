export const getCSSvar = (cssVar: string) => getComputedStyle(document.documentElement).getPropertyValue(cssVar);
