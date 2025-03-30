import React, { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VirtualList, VirtualListRef } from "@rico-ui/react";
import styled from "@emotion/styled";

// 创建一个基础的列表项组件用于示例
interface ListItemProps {
  even?: boolean;
}

const ListItem = styled.div<ListItemProps>`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  background-color: ${({ even }: { even?: boolean }) =>
    even ? "#f9f9f9" : "white"};

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-weight: bold;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-size: 14px;
  color: #666;
`;

// 定义列表项数据类型
interface ItemData {
  id: number;
  title: string;
  description: string;
}

// 生成示例数据
const generateItems = (count: number): ItemData[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    description: `这是第 ${index + 1} 个列表项的描述文字`,
  }));
};

const meta: Meta<typeof VirtualList> = {
  title: "Components/VirtualList",
  component: VirtualList,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
VirtualList 是一个高性能的虚拟滚动列表组件，专为移动端场景优化。

## 特性

- 📱 移动端友好：支持下拉刷新和上拉加载更多
- 🚀 高性能：只渲染可视区域内的元素，适合大数据量渲染
- 🔄 数据操作：支持添加、删除、更新列表项
- 📖 虚拟滚动：减少内存占用，提高滚动性能
- 🎯 精确定位：可以滚动到指定项
- 🔍 优化加载：支持分页加载数据
- 💫 过渡动画：可选的列表项动画效果

## 移动端适配

组件针对移动设备的触摸操作进行了特别优化，包括惯性滚动、平滑过渡和触摸反馈等特性。
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: "number",
      description: "容器高度",
      table: {
        type: { summary: "number" },
      },
    },
    itemHeight: {
      control: "number",
      description: "列表项高度",
      table: {
        type: { summary: "number" },
      },
    },
    enablePullToRefresh: {
      control: "boolean",
      description: "是否启用下拉刷新",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    enableLoadMore: {
      control: "boolean",
      description: "是否启用加载更多",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    enableAnimation: {
      control: "boolean",
      description: "是否启用动画效果",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    total: {
      control: "number",
      description: "数据总量",
      table: {
        type: { summary: "number" },
      },
    },
    pageSize: {
      control: "number",
      description: "分页大小",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "10" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualList>;

// 基础用法
export const Basic: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
    docs: {
      description: {
        story:
          "基础版本的虚拟列表，展示了基本的滚动和渲染功能。适用于简单的列表展示场景。",
      },
    },
  },
  args: {
    height: 600,
    itemHeight: 76,
    dataSource: generateItems(100),
    renderItem: (item: ItemData, index: number) => (
      <ListItem even={index % 2 === 0}>
        <Avatar>{item.id}</Avatar>
        <Content>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
        </Content>
      </ListItem>
    ),
  },
};

// 带有下拉刷新和加载更多功能
export const WithRefreshAndLoadMore: Story = {
  parameters: {
    viewport: {
      defaultViewport: "huaweiP40",
    },
    docs: {
      description: {
        story:
          "展示了下拉刷新和上拉加载更多功能，是移动应用中最常用的列表模式。可以通过拖动顶部触发刷新，滚动到底部自动加载更多数据。",
      },
    },
  },
  render: (args) => {
    const listRef = useRef<VirtualListRef>(null);
    const [data, setData] = React.useState<ItemData[]>(generateItems(20));
    const [isLoading, setIsLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);

    const handleRefresh = async (): Promise<void> => {
      setIsLoading(true);
      // 模拟网络请求
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setData(generateItems(20));
      setPage(1);
      setIsLoading(false);
    };

    const handleLoadMore = async (): Promise<void> => {
      setIsLoading(true);
      // 模拟网络请求
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newItems = generateItems(10).map((item) => ({
        ...item,
        id: item.id + page * 20,
        title: `加载更多项 ${item.id + page * 20}`,
      }));
      setData([...data, ...newItems]);
      setPage(page + 1);
      setIsLoading(false);
    };

    const buttonStyle = {
      padding: "8px 12px",
      margin: "0 4px",
      backgroundColor: "#f5f5f5",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
    };

    return (
      <div style={{ padding: "0px", maxWidth: "100%" }}>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <button
            onClick={() => listRef.current?.scrollToIndex(0)}
            style={buttonStyle}
          >
            滚动到顶部
          </button>
          <button
            onClick={() => listRef.current?.scrollToIndex(data.length - 1)}
            style={buttonStyle}
          >
            滚动到底部
          </button>
          <button
            onClick={handleRefresh}
            style={{
              ...buttonStyle,
              backgroundColor: isLoading ? "#eee" : "#f5f5f5",
            }}
            disabled={isLoading}
          >
            手动刷新
          </button>
        </div>

        <VirtualList
          {...args}
          ref={listRef}
          height={600}
          itemHeight={76}
          dataSource={data}
          total={100}
          enablePullToRefresh
          enableLoadMore
          enableAnimation
          onRefresh={handleRefresh}
          onLoadMore={handleLoadMore}
          idKey="id"
          renderItem={(item: ItemData, index: number) => (
            <ListItem even={index % 2 === 0}>
              <Avatar>{item.id}</Avatar>
              <Content>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
              </Content>
            </ListItem>
          )}
        />
      </div>
    );
  },
};

// 小尺寸列表项的示例
export const SmallItemSize: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphoneSE",
    },
    docs: {
      description: {
        story:
          "针对小屏幕设备优化的紧凑型列表，通过减小列表项高度和内部元素大小，提高单屏内容密度。适合在小屏幕手机上显示更多内容。",
      },
    },
  },
  args: {
    height: 500,
    itemHeight: 48,
    dataSource: generateItems(100),
    renderItem: (item: ItemData, index: number) => (
      <ListItem even={index % 2 === 0} style={{ padding: "8px 12px" }}>
        <Avatar style={{ width: "32px", height: "32px", fontSize: "12px" }}>
          {item.id}
        </Avatar>
        <Content>
          <Title style={{ fontSize: "14px" }}>{item.title}</Title>
          <Description style={{ fontSize: "12px" }}>
            {item.description}
          </Description>
        </Content>
      </ListItem>
    ),
  },
};

// 大数据量展示
export const LargeDataSet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "xiaomi12",
    },
    docs: {
      description: {
        story:
          "加载10,000条数据的示例，展示了VirtualList在处理大数据量时的性能优势。即使数据量庞大，也能保持流畅的滚动体验和较低的内存占用。",
      },
    },
  },
  args: {
    height: 600,
    itemHeight: 50,
    dataSource: generateItems(10000),
    renderItem: (item: ItemData, index: number) => (
      <ListItem even={index % 2 === 0} style={{ height: 48 }}>
        <Avatar style={{ width: 30, height: 30 }}>{item.id % 100}</Avatar>
        <Content>
          <Title>
            #{item.id} {item.title}
          </Title>
        </Content>
      </ListItem>
    ),
    overscan: 20,
    enableAnimation: true,
  },
};

// 横屏模式
export const LandscapeMode: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
    docs: {
      description: {
        story:
          "横屏模式下的列表展示，针对用户旋转设备的场景进行了布局优化。适合需要在横屏状态下使用的应用场景，如视频列表、游戏排行榜等。",
      },
    },
  },
  args: {
    height: 320,
    itemHeight: 64,
    dataSource: generateItems(50),
    renderItem: (item: ItemData, index: number) => (
      <ListItem even={index % 2 === 0}>
        <Avatar style={{ minWidth: "36px", height: "36px", fontSize: "12px" }}>
          {item.id}
        </Avatar>
        <Content>
          <Title style={{ fontSize: "14px" }}>{item.title}</Title>
          <Description style={{ fontSize: "12px" }}>
            {item.description}
          </Description>
        </Content>
      </ListItem>
    ),
  },
};
