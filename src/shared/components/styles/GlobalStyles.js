import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-family: "Noto Sans KR", sans-serif;
  }
  
  body {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
  }
  
  ul {
    list-style: none;
  }
  
  .container {
    width: 1280px;
    margin: 0 auto;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 0;
  }
`;
