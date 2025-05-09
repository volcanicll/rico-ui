import React from "react";
import { createRoot, Root } from "react-dom/client";
import Modal from "./Modal";
import styles from "./modal.module.less";

export { default as Modal } from "./Modal";

interface ModalOptions {
  title?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  maskClosable?: boolean;
  visible?: boolean;
  afterClose?: () => void;
}

function open(options: ModalOptions) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  // 创建 root 实例
  const root: Root = createRoot(div);

  let currentConfig: ModalOptions & { visible: boolean } = {
    ...options,
    visible: true,
    onCancel: () => {
      options.onCancel?.();
      close();
    },
    onConfirm: () => {
      options.onConfirm?.();
      close();
    },
    afterClose: () => {
      root.unmount();
      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
    },
  };

  function render(config: ModalOptions & { visible: boolean }) {
    root.render(React.createElement(Modal, config));
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
    };
    render(currentConfig);
  }

  function update(newConfig: Partial<ModalOptions>) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
      visible:
        newConfig.visible !== undefined
          ? newConfig.visible
          : currentConfig.visible,
    };
    render(currentConfig);
  }

  render(currentConfig);

  return {
    close,
    update,
  };
}

export const ModalService = {
  open,
  confirm: (options: Omit<ModalOptions, "footer">) => {
    return open({
      ...options,
      footer: null,
    });
  },
  info: (options: Omit<ModalOptions, "footer">) => {
    return open({
      ...options,
      footer: null,
    });
  },
};
