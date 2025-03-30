import styled from "@emotion/styled";
import React, { ReactNode, forwardRef, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片内边距
   * @default 'default'
   */
  padding?: "none" | "small" | "default" | "large";
  /**
   * 是否有阴影
   * @default true
   */
  shadow?: boolean;
  /**
   * 是否有边框
   * @default false
   */
  bordered?: boolean;
  /**
   * 卡片圆角
   * @default 'default'
   */
  radius?: "none" | "small" | "default" | "large" | "full";
  /**
   * 自定义背景色
   */
  bgColor?: string;
  /**
   * 卡片内容
   */
  children?: ReactNode;
}

const getPadding = (padding: CardProps["padding"]) => {
  switch (padding) {
    case "none":
      return "0";
    case "small":
      return "12px";
    case "large":
      return "24px";
    case "default":
    default:
      return "16px";
  }
};

const getRadius = (radius: CardProps["radius"]) => {
  switch (radius) {
    case "none":
      return "0";
    case "small":
      return "4px";
    case "large":
      return "16px";
    case "full":
      return "9999px";
    case "default":
    default:
      return "8px";
  }
};

const StyledCard = styled.div<CardProps>`
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.colors.cardBackground};
  padding: ${({ padding = "default" }) => getPadding(padding)};
  border-radius: ${({ radius = "default" }) => getRadius(radius)};

  ${({ shadow }) =>
    shadow &&
    `
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  `}

  ${({ bordered, theme }) =>
    bordered &&
    `
    border: 1px solid ${theme.colors.border};
  `}
`;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledCard ref={ref} {...props}>
        {children}
      </StyledCard>
    );
  }
);

Card.displayName = "Card";
