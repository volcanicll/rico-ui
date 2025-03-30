import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";

/**
 * 默认主题类型
 */
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
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  zIndices: {
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
}

/**
 * 默认主题
 */
export const defaultTheme: Theme = {
  colors: {
    primary: "#3366FF",
    primaryLight: "#D6E0FF",
    primaryDark: "#1939B7",
    secondary: "#6C757D",
    secondaryLight: "#E9ECEF",
    secondaryDark: "#343A40",
    success: "#2DCE89",
    warning: "#FFB020",
    error: "#F44336",
    info: "#11CDEF",
    background: "#F8F9FA",
    cardBackground: "#FFFFFF",
    text: "#212529",
    textSecondary: "#6C757D",
    border: "#DEE2E6",
    white: "#FFFFFF",
    black: "#000000",
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    md: "0 4px 6px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
    lg: "0 10px 20px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08)",
  },
  radii: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
  zIndices: {
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
};

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  darkTheme?: Theme | undefined;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = defaultTheme,
  darkTheme,
}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const themeValue = useMemo(() => {
    return {
      theme: isDark && darkTheme ? darkTheme : initialTheme,
      toggleTheme,
    };
  }, [isDark, initialTheme, darkTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <EmotionThemeProvider theme={themeValue.theme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
