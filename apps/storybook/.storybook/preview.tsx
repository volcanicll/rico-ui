// @ts-ignore 解决类型错误
import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider, defaultTheme } from "@rico-ui/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

// 自定义移动设备视口配置
const CUSTOM_VIEWPORTS = {
  iphone12: {
    name: "iPhone 12/13/14",
    styles: {
      width: "390px",
      height: "844px",
    },
    type: "mobile",
  },
  iphone12Mini: {
    name: "iPhone 12/13 Mini",
    styles: {
      width: "360px",
      height: "780px",
    },
    type: "mobile",
  },
  iphoneSE: {
    name: "iPhone SE (2020)",
    styles: {
      width: "320px",
      height: "568px",
    },
    type: "mobile",
  },
  huaweiP40: {
    name: "Huawei P40",
    styles: {
      width: "360px",
      height: "800px",
    },
    type: "mobile",
  },
  xiaomi12: {
    name: "Xiaomi 12",
    styles: {
      width: "393px",
      height: "851px",
    },
    type: "mobile",
  },
  vivox80: {
    name: "Vivo X80",
    styles: {
      width: "376px",
      height: "812px",
    },
    type: "mobile",
  },
};

// 移动设备容器组件
const MobileContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        maxWidth: "100%",
        height: "100%",
        overflow: "hidden",
        background: "white",
        position: "relative",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {children}
    </div>
  );
};

// 创建预览配置
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: CUSTOM_VIEWPORTS,
      defaultViewport: "iphone12",
    },
    options: {
      storySort: {
        order: ["Components", ["VirtualList"]],
      },
    },
  },
  // 使用装饰器应用主题提供者和移动设备容器
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme={defaultTheme}>
        <MobileContainer>
          <Story />
        </MobileContainer>
      </ThemeProvider>
    ),
  ],
};

export default preview;
