import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalService } from "@rico-ui/react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 基础 Modal 组件示例
export const Basic: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <button onClick={() => setVisible(true)}>打开基础 Modal</button>
        <Modal
          visible={visible}
          title="基础 Modal"
          content="这是一个基础的 Modal 对话框示例。"
          onCancel={() => setVisible(false)}
          onConfirm={() => {
            alert("确认操作");
            setVisible(false);
          }}
        />
      </>
    );
  },
};

// 无标题 Modal
export const NoTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <button onClick={() => setVisible(true)}>打开无标题 Modal</button>
        <Modal
          visible={visible}
          content="这是一个没有标题的 Modal 对话框。"
          onCancel={() => setVisible(false)}
          onConfirm={() => {
            alert("确认操作");
            setVisible(false);
          }}
        />
      </>
    );
  },
};

// 自定义底部 Modal
export const CustomFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <button onClick={() => setVisible(true)}>打开自定义底部 Modal</button>
        <Modal
          visible={visible}
          title="自定义底部"
          content="这个 Modal 有自定义的底部按钮。"
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <button onClick={() => setVisible(false)}>返回</button>
              <button
                onClick={() => {
                  alert("保存成功");
                  setVisible(false);
                }}
                style={{ backgroundColor: "green", color: "white" }}
              >
                保存
              </button>
            </div>
          }
          onCancel={() => setVisible(false)}
        />
      </>
    );
  },
};

// 无底部 Modal
export const NoFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <button onClick={() => setVisible(true)}>打开无底部 Modal</button>
        <Modal
          visible={visible}
          title="无底部"
          content="这个 Modal 没有底部按钮区域。"
          footer={null}
          onCancel={() => setVisible(false)}
        />
      </>
    );
  },
};

// 使用 ModalService 的示例
export const ModalService1: Story = {
  render: () => {
    // 打开确认对话框
    const showConfirm = () => {
      ModalService.confirm({
        title: "确认操作",
        content: "你确定要执行此操作吗？",
        onConfirm: () => alert("确认操作已执行"),
        onCancel: () => console.log("操作已取消"),
      });
    };

    // 打开信息对话框
    const showInfo = () => {
      ModalService.info({
        title: "提示信息",
        content: "操作已完成！",
        onConfirm: () => console.log("用户已知晓"),
      });
    };

    // 打开自定义对话框
    const showCustom = () => {
      const modal = ModalService.open({
        title: "自定义对话框",
        content: (
          <div>
            <p>这是一个通过 ModalService.open 创建的对话框</p>
            <p>你可以在这里放置任何内容</p>
          </div>
        ),
        onConfirm: () => console.log("确认"),
        onCancel: () => console.log("取消"),
      });

      // 5秒后自动关闭
      setTimeout(() => {
        modal.close();
      }, 5000);
    };

    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={showConfirm}>确认对话框</button>
        <button onClick={showInfo}>信息提示框</button>
        <button onClick={showCustom}>自定义对话框</button>
      </div>
    );
  },
};

// 长内容 Modal 示例
export const LongContent: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <button onClick={() => setVisible(true)}>打开长内容 Modal</button>
        <Modal
          visible={visible}
          title="长内容示例"
          content={
            <div>
              {Array(20)
                .fill(0)
                .map((_, index) => (
                  <p key={index}>
                    这是第 {index + 1} 行内容，用于测试 Modal 的滚动行为。
                  </p>
                ))}
            </div>
          }
          onCancel={() => setVisible(false)}
          onConfirm={() => setVisible(false)}
        />
      </>
    );
  },
};
