import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import App from './App.tsx'
import { Theme } from './theme.ts';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f9f9f9;
  }
  *{
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
  }
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
