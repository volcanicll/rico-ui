import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.less";

interface ModalProps {
  visible: boolean;
  title?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  maskClosable?: boolean;
  afterClose?: () => void;
}

const Modal = ({
  visible,
  title,
  content,
  footer,
  onCancel,
  onConfirm,
  maskClosable = true,
  afterClose,
}: ModalProps) => {
  const [animationState, setAnimationState] = useState<
    "entering" | "entered" | "exiting" | "exited"
  >("exited");
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let timer: NodeJS.Timeout;

    if (visible) {
      setIsRendered(true);
      // 使用 requestAnimationFrame 确保动画流畅
      animationFrame = requestAnimationFrame(() => {
        setAnimationState("entering");
        timer = setTimeout(() => {
          setAnimationState("entered");
        }, 20);
      });
    } else if (isRendered) {
      setAnimationState("exiting");
      timer = setTimeout(() => {
        setAnimationState("exited");
        setIsRendered(false);
        afterClose?.();
      }, 300);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [visible, afterClose]);

  const handleMaskClick = () => {
    if (maskClosable) {
      onCancel?.();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const defaultFooter = (
    <>
      <button
        className={`${styles.button} ${styles.cancelButton}`}
        onClick={onCancel}
      >
        取消
      </button>
      <button
        className={`${styles.button} ${styles.confirmButton}`}
        onClick={onConfirm}
      >
        确定
      </button>
    </>
  );

  if (!isRendered) {
    return null;
  }

  return createPortal(
    <div
      className={`${styles.modalOverlay} ${
        styles[
          `modal${animationState.charAt(0).toUpperCase() + animationState.slice(1)}`
        ]
      }`}
      onClick={handleMaskClick}
    >
      <div className={`${styles.modalContainer}`} onClick={handleModalClick}>
        {title && (
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{title}</h3>
            <button className={styles.closeButton} onClick={onCancel}>
              X
            </button>
          </div>
        )}
        <div className={styles.modalBody}>{content}</div>
        {footer !== null && (
          <div className={styles.modalFooter}>{footer || defaultFooter}</div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
