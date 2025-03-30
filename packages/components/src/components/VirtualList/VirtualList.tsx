import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  CSSProperties,
  UIEvent,
  useCallback,
  useMemo,
  ReactNode,
  ForwardedRef,
} from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// 定义动画
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 样式组件
const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const Scroller = styled.div`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  will-change: transform;
  height: 100%;
  width: 100%;
`;

const Content = styled.div<{ height: number }>`
  position: relative;
  height: ${({ height }) => height}px;
  width: 100%;
`;

const PullIndicator = styled.div<{ height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 10;
  overflow: hidden;
  transition:
    height 0.2s ease-out,
    opacity 0.2s ease-out;
`;

const PullText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RefreshingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpinnerText = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoadMoreIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  width: 100%;
  background-color: transparent;
`;

const LoadFinishedText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  text-align: center;
  padding: 12px 0;
`;

const LoadMoreText = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Item = styled.div<{ animated?: boolean; delay?: number }>`
  position: absolute;
  width: 100%;
  will-change: transform;

  ${({ animated, delay }) =>
    animated
      ? `
    opacity: 0;
    transform: translateY(10px);
    animation: ${fadeInUp} 0.3s ease-out ${delay || 0}s forwards;
  `
      : ""}
`;

export interface VirtualListProps<T = any> {
  /**
   * 列表数据
   */
  dataSource: T[];
  /**
   * 数据总量，用于判断是否已加载全部数据
   */
  total?: number;
  /**
   * 渲染列表项的函数
   */
  renderItem: (item: T, index: number) => ReactNode;
  /**
   * 容器高度
   */
  height: number;
  /**
   * 列表项高度
   */
  itemHeight: number;
  /**
   * 预加载的列表项数量
   */
  overscan?: number;
  /**
   * 容器类名
   */
  className?: string;
  /**
   * 容器样式
   */
  style?: CSSProperties;
  /**
   * 列表项类名
   */
  itemClassName?: string;
  /**
   * 列表项样式
   */
  itemStyle?: CSSProperties;
  /**
   * 滚动事件回调
   */
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  /**
   * 是否启用下拉刷新
   */
  enablePullToRefresh?: boolean;
  /**
   * 下拉刷新回调函数
   */
  onRefresh?: () => Promise<void>;
  /**
   * 是否启用加载更多
   */
  enableLoadMore?: boolean;
  /**
   * 加载更多回调函数
   */
  onLoadMore?: (
    pageNo: number,
    pageSize: number,
    params?: any
  ) => Promise<void>;
  /**
   * 是否启用动画
   */
  enableAnimation?: boolean;
  /**
   * 分页大小，用于加载更多功能
   */
  pageSize?: number;
  /**
   * 自定义加载更多参数
   */
  loadMoreParams?: any;
  /**
   * 全部加载完成时的提示文本
   */
  loadFinishedText?: string;
  /**
   * 数据更新回调函数
   */
  onDataUpdate?: (newDataSource: T[]) => void;
  /**
   * 数据项的唯一标识字段名，用于优化查找和更新操作
   * 如果提供此字段，组件将使用Map结构优化查找性能
   */
  idKey?: string;
  /**
   * 是否启用乐观更新
   * 启用后，数据更新会立即反映在UI上，如果后续操作失败可以回滚
   */
  enableOptimisticUpdate?: boolean;
}

export interface VirtualListRef {
  /**
   * 滚动到指定索引的列表项
   */
  scrollToIndex: (index: number) => void;
  /**
   * 滚动到指定位置
   */
  scrollTo: (scrollTop: number) => void;
  /**
   * 获取当前滚动位置
   */
  getScrollTop: () => number;
  /**
   * 手动触发刷新
   */
  refresh: () => Promise<void>;
  /**
   * 更新指定索引的列表项数据
   */
  updateItem: <U = any>(index: number, newData: U) => void;
  /**
   * 删除指定索引的列表项
   */
  deleteItem: (index: number) => void;
  /**
   * 批量更新列表数据
   */
  updateItems: <U = any>(newDataSource: U[]) => void;
  /**
   * 通过ID更新列表项数据
   * 需要配合idKey属性使用
   */
  updateItemById: <U = any>(id: string | number, newData: U) => void;
  /**
   * 通过ID删除列表项
   * 需要配合idKey属性使用
   */
  deleteItemById: (id: string | number) => void;
  /**
   * 批量通过ID更新列表项
   * 需要配合idKey属性使用
   */
  updateItemsById: <U = any>(items: U[]) => void;
  /**
   * 回滚最近一次更新操作
   * 仅在enableOptimisticUpdate为true时有效
   */
  rollbackLastUpdate: () => void;
}

function VirtualListInner<T = any>(
  props: VirtualListProps<T>,
  ref: ForwardedRef<VirtualListRef>
) {
  const {
    dataSource,
    total,
    renderItem,
    height,
    itemHeight,
    overscan = 10,
    className,
    style,
    itemClassName,
    itemStyle,
    onScroll,
    enablePullToRefresh = false,
    onRefresh,
    enableLoadMore = false,
    onLoadMore,
    enableAnimation = false,
    pageSize = 10,
    loadMoreParams,
    loadFinishedText = "已加载全部数据",
    idKey,
    enableOptimisticUpdate = false,
    onDataUpdate,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const touchStartY = useRef(0);
  const touchStartScrollTop = useRef(0);
  const lastItemsRef = useRef<T[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // 存储最近一次更新前的数据，用于回滚操作
  const lastUpdateRef = useRef<{
    data: T[];
    type: "update" | "delete" | "multiple";
  } | null>(null);

  // 使用Map结构优化通过ID查找项的性能
  const itemsMap = useRef<Map<string | number, { data: T; index: number }>>(
    new Map()
  );

  // 当前页码，用于加载更多功能
  const [currentPage, setCurrentPage] = useState(1);

  // 决定当前可见的元素
  const visibleItemsCount = Math.ceil(height / itemHeight) + 2 * overscan;
  const totalHeight = dataSource.length * itemHeight;

  // 计算开始索引和可见列表项
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    dataSource.length - 1,
    startIndex + visibleItemsCount - 1
  );

  // 可见列表项
  const visibleItems = useMemo(() => {
    return dataSource.slice(startIndex, endIndex + 1);
  }, [dataSource, startIndex, endIndex]);

  // 如果提供了idKey，更新Map结构
  useEffect(() => {
    if (idKey) {
      const newMap = new Map<string | number, { data: T; index: number }>();
      dataSource.forEach((item, index) => {
        const id = (item as any)[idKey];
        if (id !== undefined) {
          newMap.set(id, { data: item, index });
        }
      });
      itemsMap.current = newMap;
    }
  }, [dataSource, idKey]);

  // 保存上一次的数据用于回滚
  useEffect(() => {
    if (enableOptimisticUpdate) {
      lastItemsRef.current = [...dataSource];
    }
  }, [dataSource, enableOptimisticUpdate]);

  // 处理滚动事件
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const newScrollTop = containerRef.current.scrollTop;
        setScrollTop(newScrollTop);
      }
    });

    // 触发外部滚动回调
    onScroll?.(event);

    // 处理加载更多
    if (
      enableLoadMore &&
      !isLoadingMore &&
      event.currentTarget.scrollTop + event.currentTarget.clientHeight >=
        event.currentTarget.scrollHeight - 50 &&
      dataSource.length < (total || Infinity)
    ) {
      handleLoadMore();
    }
  };

  // 处理触摸开始事件
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (enablePullToRefresh && containerRef.current) {
      touchStartY.current = e.touches[0].clientY;
      touchStartScrollTop.current = containerRef.current.scrollTop;
    }
  };

  // 处理触摸移动事件
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (
      enablePullToRefresh &&
      containerRef.current &&
      containerRef.current.scrollTop === 0 &&
      e.touches[0].clientY > touchStartY.current
    ) {
      const distance = Math.min(
        (e.touches[0].clientY - touchStartY.current) * 0.4,
        100
      );
      setPullDistance(distance);
      setIsPulling(true);
      // 阻止默认滚动行为
      e.preventDefault();
    }
  };

  // 处理触摸结束事件
  const handleTouchEnd = async () => {
    if (enablePullToRefresh && isPulling) {
      if (pullDistance > 60) {
        // 触发刷新
        await handleRefresh();
      }
      setPullDistance(0);
      setIsPulling(false);
    }
  };

  // 处理刷新逻辑
  const handleRefresh = async () => {
    if (enablePullToRefresh && onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    }
  };

  // 处理加载更多逻辑
  const handleLoadMore = async () => {
    if (
      enableLoadMore &&
      onLoadMore &&
      !isLoadingMore &&
      dataSource.length < (total || Infinity)
    ) {
      setIsLoadingMore(true);
      try {
        const nextPage = currentPage + 1;
        await onLoadMore(nextPage, pageSize, loadMoreParams);
        setCurrentPage(nextPage);
      } catch (error) {
        console.error("Load more failed:", error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => {
    const publicMethods: VirtualListRef = {
      scrollToIndex: (index: number) => {
        if (containerRef.current) {
          containerRef.current.scrollTop = index * itemHeight;
        }
      },

      scrollTo: (newScrollTop: number) => {
        if (containerRef.current) {
          containerRef.current.scrollTop = newScrollTop;
        }
      },

      getScrollTop: () => {
        return containerRef.current ? containerRef.current.scrollTop : 0;
      },

      refresh: handleRefresh,

      updateItem: function <U>(index: number, newData: U) {
        if (index >= 0 && index < dataSource.length) {
          // 保存当前数据用于回滚
          if (enableOptimisticUpdate) {
            lastUpdateRef.current = {
              data: [...dataSource],
              type: "update",
            };
          }

          const newDataSource = [...dataSource];
          newDataSource[index] = newData as unknown as T;

          // 如果提供了idKey，更新Map
          if (idKey) {
            const id = (newData as any)[idKey];
            if (id !== undefined) {
              itemsMap.current.set(id, {
                data: newData as unknown as T,
                index,
              });
            }
          }

          // 调用外部更新回调
          onDataUpdate?.(newDataSource);
        }
      },

      deleteItem: (index: number) => {
        if (index >= 0 && index < dataSource.length) {
          // 保存当前数据用于回滚
          if (enableOptimisticUpdate) {
            lastUpdateRef.current = {
              data: [...dataSource],
              type: "delete",
            };
          }

          const newDataSource = [...dataSource];
          newDataSource.splice(index, 1);

          // 如果提供了idKey，更新Map
          if (idKey) {
            const deletedItem = dataSource[index];
            const id = (deletedItem as any)[idKey];
            if (id !== undefined) {
              itemsMap.current.delete(id);

              // 重新计算索引
              for (const [key, value] of itemsMap.current.entries()) {
                if (value.index > index) {
                  itemsMap.current.set(key, {
                    ...value,
                    index: value.index - 1,
                  });
                }
              }
            }
          }

          // 调用外部更新回调
          onDataUpdate?.(newDataSource);
        }
      },

      updateItems: function <U>(newDataSource: U[]) {
        // 保存当前数据用于回滚
        if (enableOptimisticUpdate) {
          lastUpdateRef.current = {
            data: [...dataSource],
            type: "multiple",
          };
        }

        // 如果提供了idKey，更新Map
        if (idKey) {
          const newMap = new Map<string | number, { data: T; index: number }>();
          (newDataSource as unknown as T[]).forEach((item, index) => {
            const id = (item as any)[idKey];
            if (id !== undefined) {
              newMap.set(id, { data: item, index });
            }
          });
          itemsMap.current = newMap;
        }

        // 调用外部更新回调
        onDataUpdate?.(newDataSource as unknown as T[]);
      },

      updateItemById: function <U>(id: string | number, newData: U) {
        if (!idKey) return;

        const item = itemsMap.current.get(id);
        if (item) {
          // 保存当前数据用于回滚
          if (enableOptimisticUpdate) {
            lastUpdateRef.current = {
              data: [...dataSource],
              type: "update",
            };
          }

          const newDataSource = [...dataSource];
          newDataSource[item.index] = newData as unknown as T;

          // 更新Map
          itemsMap.current.set(id, {
            data: newData as unknown as T,
            index: item.index,
          });

          // 调用外部更新回调
          onDataUpdate?.(newDataSource);
        }
      },

      deleteItemById: (id: string | number) => {
        if (!idKey) return;

        const item = itemsMap.current.get(id);
        if (item) {
          // 保存当前数据用于回滚
          if (enableOptimisticUpdate) {
            lastUpdateRef.current = {
              data: [...dataSource],
              type: "delete",
            };
          }

          const newDataSource = [...dataSource];
          newDataSource.splice(item.index, 1);

          // 更新Map
          itemsMap.current.delete(id);

          // 重新计算索引
          for (const [key, value] of itemsMap.current.entries()) {
            if (value.index > item.index) {
              itemsMap.current.set(key, {
                ...value,
                index: value.index - 1,
              });
            }
          }

          // 调用外部更新回调
          onDataUpdate?.(newDataSource);
        }
      },

      updateItemsById: function <U>(items: U[]) {
        if (!idKey) return;

        // 保存当前数据用于回滚
        if (enableOptimisticUpdate) {
          lastUpdateRef.current = {
            data: [...dataSource],
            type: "multiple",
          };
        }

        const newDataSource = [...dataSource];
        let hasUpdates = false;

        items.forEach((item) => {
          const id = (item as any)[idKey];
          if (id !== undefined) {
            const existingItem = itemsMap.current.get(id);
            if (existingItem) {
              newDataSource[existingItem.index] = item as unknown as T;
              itemsMap.current.set(id, {
                data: item as unknown as T,
                index: existingItem.index,
              });
              hasUpdates = true;
            }
          }
        });

        if (hasUpdates) {
          // 调用外部更新回调
          onDataUpdate?.(newDataSource);
        }
      },

      rollbackLastUpdate: () => {
        if (enableOptimisticUpdate && lastUpdateRef.current) {
          // 调用外部更新回调
          onDataUpdate?.(lastUpdateRef.current.data);
          lastUpdateRef.current = null;
        }
      },
    };

    return publicMethods;
  }, [
    dataSource,
    itemHeight,
    enableOptimisticUpdate,
    idKey,
    onDataUpdate,
    handleRefresh,
  ]);

  // 获取列表项的动画样式
  const getItemAnimationStyle = useCallback(
    (index: number): CSSProperties => {
      if (!enableAnimation) return {};

      const delay = Math.min(0.1 + (index - startIndex) * 0.03, 0.5);
      return { animationDelay: `${delay}s` };
    },
    [enableAnimation, startIndex]
  );

  return (
    <Container
      ref={containerRef}
      className={className}
      style={{ height, ...style }}
    >
      {enablePullToRefresh && (
        <PullIndicator height={isRefreshing ? 60 : pullDistance}>
          {isRefreshing ? (
            <RefreshingSpinner>
              <Spinner />
              <SpinnerText>刷新中...</SpinnerText>
            </RefreshingSpinner>
          ) : (
            <PullText>{pullDistance > 60 ? "释放刷新" : "下拉刷新"}</PullText>
          )}
        </PullIndicator>
      )}

      <Scroller
        onScroll={handleScroll}
        onTouchStart={enablePullToRefresh ? handleTouchStart : undefined}
        onTouchMove={enablePullToRefresh ? handleTouchMove : undefined}
        onTouchEnd={enablePullToRefresh ? handleTouchEnd : undefined}
      >
        <Content height={totalHeight}>
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            const top = actualIndex * itemHeight;

            return (
              <Item
                key={idKey ? (item as any)[idKey] || actualIndex : actualIndex}
                style={{
                  top,
                  height: itemHeight,
                  ...itemStyle,
                  ...getItemAnimationStyle(actualIndex),
                }}
                className={itemClassName}
                animated={enableAnimation}
                delay={(actualIndex - startIndex) * 0.03}
              >
                {renderItem(item, actualIndex)}
              </Item>
            );
          })}

          {enableLoadMore && dataSource.length > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
              }}
            >
              {dataSource.length < (total || Infinity) ? (
                <LoadMoreIndicator>
                  {isLoadingMore ? (
                    <>
                      <Spinner />
                      <LoadMoreText>加载中...</LoadMoreText>
                    </>
                  ) : (
                    <LoadMoreText>上拉加载更多</LoadMoreText>
                  )}
                </LoadMoreIndicator>
              ) : (
                <LoadFinishedText>{loadFinishedText}</LoadFinishedText>
              )}
            </div>
          )}
        </Content>
      </Scroller>
    </Container>
  );
}

// 正确的类型定义，使用RefAttributes而非RefObject
const VirtualList = forwardRef(VirtualListInner) as unknown as <T = any>(
  props: VirtualListProps<T> & React.RefAttributes<VirtualListRef>
) => JSX.Element;

// 使用类型断言解决displayName问题
(VirtualList as any).displayName = "VirtualList";

export default VirtualList;
