import { ThemeColors } from "../store/reducers/themeReducer";

export const setThemeCss = (root: HTMLElement, theme: ThemeColors) => {
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--secondaryOpacity', theme.secondaryOpacity);
    root.style.setProperty('--secondaryRow', theme.secondaryRow);
    root.style.setProperty('--tertiary', theme.tertiary);
    root.style.setProperty('--tertiaryOpacity', theme.tertiaryOpacity);
    root.style.setProperty('--tertiaryRow', theme.tertiaryRow);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--white', theme.white);
    root.style.setProperty('--black', theme.black);
    root.style.setProperty('--success', theme.success);
    root.style.setProperty('--error', theme.error);
    root.style.setProperty('--currentColor', theme.primary);
}