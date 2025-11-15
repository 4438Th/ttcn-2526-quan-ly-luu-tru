export const Themes = {
    LIGHT: 'light',
    DARK: 'dark'
} as const;
export type ThemeType = typeof Themes[keyof typeof Themes];