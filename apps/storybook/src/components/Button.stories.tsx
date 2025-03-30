import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@rico-ui/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
      description: "按钮变体",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "按钮尺寸",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "是否为全宽度按钮",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "是否处于加载状态",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "是否禁用",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "clicked",
      description: "点击按钮时的回调",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "主要按钮",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "次要按钮",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "轮廓按钮",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "幽灵按钮",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "小尺寸按钮",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "中尺寸按钮",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "大尺寸按钮",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "全宽度按钮",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "加载中...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "禁用按钮",
  },
};
