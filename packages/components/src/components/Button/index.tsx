import styled from "@emotion/styled";
import React, { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";
import { Theme } from "../../theme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体风格
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * 按钮尺寸
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * 是否为全宽度按钮
   * @default false
   */
  fullWidth?: boolean;
  /**
   * 是否处于加载状态
   * @default false
   */
  isLoading?: boolean;
  /**
   * 按钮内容
   */
  children?: ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  outline: none;
  border: none;
  position: relative;
  overflow: hidden;

  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  ${({ theme, variant = "primary" }) => {
    const variants = {
      primary: `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        &:hover {
          background-color: ${theme.colors.primaryDark};
        }
      `,
      secondary: `
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
        &:hover {
          background-color: ${theme.colors.secondaryDark};
        }
      `,
      outline: `
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover {
          background-color: ${theme.colors.primaryLight};
        }
      `,
      ghost: `
        background-color: transparent;
        color: ${theme.colors.primary};
        &:hover {
          background-color: ${theme.colors.primaryLight};
        }
      `,
    };

    return variants[variant];
  }}

  ${({ theme, size = "md" }) => {
    const sizes = {
      sm: `
        padding: 8px 16px;
        font-size: 14px;
      `,
      md: `
        padding: 10px 20px;
        font-size: 16px;
      `,
      lg: `
        padding: 12px 24px;
        font-size: 18px;
      `,
    };

    return sizes[size];
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, ...props }, ref) => {
    return (
      <StyledButton ref={ref} disabled={isLoading || props.disabled} {...props}>
        {isLoading ? (
          <>
            <span style={{ visibility: "hidden" }}>{children}</span>
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Loading...
            </span>
          </>
        ) : (
          children
        )}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
