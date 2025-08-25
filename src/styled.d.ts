import 'styled-components';
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string,
            primaryLight: string,
            primaryDark: string,
            accent: string,
            background: string,
            surface: string,
            textPrimary: string,
            textSecondary: string,
            border: string,
            shadow: string,
        }
        spacing: {
            xs: string,
            sm: string,
            md: string,
            lg: string,
            xl: string,
        },
        radius: {
            sm: string,
            md: string,
            lg: string,
            round: string,
        },
    }
}