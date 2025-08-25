import type { DefaultTheme } from "styled-components";

export const Theme: DefaultTheme = {
    colors: {
        primary: '#000000',                 // 기본 퍼플
        primaryLight: '#000000',            // 밝은 퍼플
        primaryDark: '#000000',             // 딥 퍼플
        accent: '#000000',                  // 오키드 퍼플 (강조용)
        background: '#fff4e6',              // 연한 배경 퍼플
        surface: '#ffd8a8',                 // 카드/버튼 배경
        textPrimary: '#000000',             // 진한 텍스트
        textSecondary: '#000000',           // 보조 텍스트
        border: '#000000',                  // 경계선
        shadow: 'rgba(128, 0, 128, 0.2)',   // 퍼플 그림자
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    radius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        round: '9999px',
    },
}