export const getThemeCssVariable = (variableName: string) => {
  const root = document.querySelector(":root");
  if (root) {
    const rs = getComputedStyle(root);
    const color = rs.getPropertyValue(`--${variableName}`);
    return color;
  }
  return null;
};

export const setThemeCssVariable = (variableName: string, value: string) => {
  const root = document.querySelector(":root");
  if (root) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (root as any).style.setProperty(`--${variableName}`, value);
  }
};
