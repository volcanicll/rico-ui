import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryDark: string;
      secondary: string;
      secondaryLight: string;
      secondaryDark: string;
      success: string;
      warning: string;
      error: string;
      info: string;
      background: string;
      cardBackground: string;
      text: string;
      textSecondary: string;
      border: string;
      white: string;
      black: string;
    };
  }
}
