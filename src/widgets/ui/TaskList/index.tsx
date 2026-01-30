import style from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/entities/task/api/taskApi";
import { Task } from "@/widgets/ui/Task";
import type { TypeTask } from "@/entities/task/model/types";
import { useVirtualList } from "@/shared/lib/useVirtualList";

const itemHeight = 65;
const containerHeight = 650;

export const TaskList = () => {
  const { data, isLoading } = useQuery<TypeTask[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const { visibleItems, containerRef, startIndex } = useVirtualList({
    data: data ? data : [],
    containerHeight,
    itemHeight,
  });

  if (isLoading) {
    return "Загрузка";
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflowY: "auto",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        className={style.tasks}
        style={{ position: "relative", width: "100%" }}
      >
        {visibleItems?.map((task, index) => {
          return (
            <div
              key={task.id}
              style={{
                position: "absolute",
                top: (startIndex + index) * itemHeight,
                height: itemHeight,
                width: "100%",
              }}
            >
              <Task key={task.id} task={task} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
