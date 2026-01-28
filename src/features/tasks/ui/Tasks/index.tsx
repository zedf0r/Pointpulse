import style from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "@/features/api/tasksApi";
import { Task } from "@/widgets/ui/Task";

type TypeTaskProps = {
  index: number;
  id: string;
  title: string;
  description: string;
};

export const Tasks = () => {
  const { data, isLoading } = useQuery<TypeTaskProps[]>({
    queryKey: ["tasks"],
    queryFn: tasksApi,
  });

  if (isLoading) {
    return "Загрузка";
  }

  return (
    <div className={style.tasks}>
      {data?.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
};
