import style from "./style.module.scss";
import { Task } from "@/widgets/ui/Task";
import { useVirtualList } from "@/widgets/ui/TaskList/hooks/useVirtualList";

const itemHeight = 65;
const containerHeight = 650;

export const TaskList = () => {
  const { visibleItems, containerRef, isLoading, totalHeight } = useVirtualList(
    {
      containerHeight,
      itemHeight,
    },
  );

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
      <div className={style.tasks} style={{ height: totalHeight }}>
        {visibleItems?.map((task, index) => {
          return (
            <div
              key={task.id}
              style={{
                position: "absolute",
                top: (0 + index) * itemHeight,
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
