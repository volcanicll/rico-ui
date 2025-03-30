import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@rico-ui/react";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: "select",
      options: ["none", "small", "default", "large"],
      description: "卡片内边距",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    shadow: {
      control: "boolean",
      description: "是否有阴影",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    bordered: {
      control: "boolean",
      description: "是否有边框",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    radius: {
      control: "select",
      options: ["none", "small", "default", "large", "full"],
      description: "卡片圆角",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    bgColor: {
      control: "color",
      description: "自定义背景色",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          width: "300px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        默认卡片
      </div>
    ),
    shadow: true,
  },
};

export const WithoutShadow: Story = {
  args: {
    children: (
      <div
        style={{
          width: "300px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        无阴影卡片
      </div>
    ),
    shadow: false,
  },
};

export const Bordered: Story = {
  args: {
    children: (
      <div
        style={{
          width: "300px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        带边框卡片
      </div>
    ),
    bordered: true,
    shadow: false,
  },
};

export const NoPadding: Story = {
  args: {
    children: (
      <div
        style={{
          width: "300px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        无内边距卡片
      </div>
    ),
    padding: "none",
  },
};

export const LargePadding: Story = {
  args: {
    children: (
      <div
        style={{
          width: "300px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        大内边距卡片
      </div>
    ),
    padding: "large",
  },
};

export const CustomRadius: Story = {
  args: {
    children: (
      <div
        style={{
          width: "300px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        大圆角卡片
      </div>
    ),
    radius: "large",
  },
};

export const CustomBackground: Story = {
  args: {
    children: (
      <div
        style={{
          width: "300px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        自定义背景色卡片
      </div>
    ),
    bgColor: "#6200ee",
  },
};
