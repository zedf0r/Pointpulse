import { fetchTasks } from "@/entities/task/api/taskApi";
import type { TypeTask } from "@/entities/task/model/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

export const useVirtualList = ({
  containerHeight,
  itemHeight,
  overscan = 5,
}: {
  containerHeight: number;
  itemHeight: number;
  overscan?: number;
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["tasks"],
      queryFn: ({ pageParam = 1 }) => fetchTasks(String(pageParam)),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.next) {
          return null;
        }
        return allPages.length + 1;
      },
      initialPageParam: 1,
    });

  const allTasks: TypeTask[] =
    data?.pages.flatMap((page) => page.data || page) ?? [];

  const totalCount = allTasks.length;
  const totalHeight = totalCount * itemHeight;

  const visibleCount = Math.ceil(containerHeight / itemHeight);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    totalCount,
    startIndex + visibleCount + overscan * 2,
  );

  const visibleItems = allTasks.slice(0, endIndex);

  const onScroll = useCallback(() => {
    const scroll = containerRef.current?.scrollTop || 0;
    sessionStorage.setItem("taskListScroll", String(scroll));
    setScrollTop(scroll);

    if (endIndex >= totalCount - 2 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [endIndex, totalCount, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", onScroll, { passive: true });
      return () => container.removeEventListener("scroll", onScroll);
    }
  }, [onScroll]);

  useEffect(() => {
    if (!allTasks.length) return;

    const savedScroll = sessionStorage.getItem("taskListScroll");

    if (savedScroll && containerRef.current) {
      containerRef.current.scrollTop = Number(savedScroll);
      setScrollTop(Number(savedScroll));
    }
  }, [allTasks.length]);

  return {
    containerRef,
    visibleItems,
    totalHeight,
    isLoading,
  };
};
