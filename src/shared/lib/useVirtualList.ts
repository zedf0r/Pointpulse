import type { TypeTask } from "@/entities/task/model/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useVirtualList = ({
  data,
  containerHeight,
  itemHeight,
  overscan = 5,
}: {
  data: TypeTask[];
  containerHeight: number;
  itemHeight: number;
  overscan?: number;
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedData = useMemo(() => {
    return data ? [...data].sort((a, b) => a.index - b.index) : [];
  }, [data]);

  const totalCount = sortedData.length;
  const totalHeight = totalCount * itemHeight;

  const visibleCount = Math.ceil(containerHeight / itemHeight);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    totalCount,
    startIndex + visibleCount + overscan * 2,
  );

  const visibleItems = sortedData.slice(startIndex, endIndex);

  const onScroll = useCallback(() => {
    const scroll = containerRef.current?.scrollTop || 0;
    setScrollTop(scroll);
  }, [sortedData.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", onScroll, { passive: true });
      return () => container.removeEventListener("scroll", onScroll);
    }
  }, [onScroll]);

  return {
    containerRef,
    visibleItems,
    startIndex,
    totalHeight,
  };
};
