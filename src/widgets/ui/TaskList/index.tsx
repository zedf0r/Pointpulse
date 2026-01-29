import style from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/entities/task/api/taskApi";
import { Task } from "@/widgets/ui/Task";
import type { TypeTask } from "@/entities/task/model/types";

export const TaskList = () => {
  const { data, isLoading } = useQuery<TypeTask[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) {
    return "Загрузка";
  }

  data?.sort((a, b) => a.index - b.index);

  return (
    <div className={style.tasks}>
      {data?.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
};
