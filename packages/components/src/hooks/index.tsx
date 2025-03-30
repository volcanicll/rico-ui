import { useState, useCallback, useEffect, RefObject } from 'react';

/**
 * 自定义钩子 - 管理表单字段状态
 */
export function useFormField<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = useCallback((newValue: T) => {
    setValue(newValue);
    setIsDirty(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
    setIsDirty(false);
    setIsTouched(false);
  }, [initialValue]);

  return {
    value,
    isDirty,
    isTouched,
    handleChange,
    handleBlur,
    reset
  };
}

/**
 * 自定义钩子 - 检测点击元素外部
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

/**
 * 自定义钩子 - 管理媒体查询
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);

    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}

/**
 * 自定义钩子 - 简单的延迟状态
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}