declare module "@rico-ui/react" {
  import {
    FC,
    ReactNode,
    ButtonHTMLAttributes,
    HTMLAttributes,
    RefObject,
  } from "react";

  // Button 类型
  export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
  export type ButtonSize = "sm" | "md" | "lg";

  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
    children?: ReactNode;
  }

  // Card 类型
  export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: "none" | "small" | "default" | "large";
    shadow?: boolean;
    bordered?: boolean;
    radius?: "none" | "small" | "default" | "large" | "full";
    bgColor?: string;
    children?: ReactNode;
  }

  // 主题相关类型
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

  export interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Theme;
    darkTheme?: Theme;
  }

  export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
  }

  // 钩子函数
  export function useTheme(): ThemeContextProps;
  export function useFormField<T>(initialValue: T): {
    value: T;
    isDirty: boolean;
    isTouched: boolean;
    handleChange: (newValue: T) => void;
    handleBlur: () => void;
    reset: () => void;
  };
  export function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: () => void
  ): void;
  export function useMediaQuery(query: string): boolean;
  export function useDebounce<T>(value: T, delay?: number): T;

  // 组件导出
  export const Button: FC<ButtonProps>;
  export const Card: FC<CardProps>;
  export const ThemeProvider: FC<ThemeProviderProps>;
  export const defaultTheme: Theme;
}
