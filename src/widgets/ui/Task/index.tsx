import { Button } from "@/shared/ui/Button";
import style from "./style.module.scss";

type TypeTaskProps = {
  id: string;
  index: number;
  title: string;
  description: string;
};

export const Task = ({ task }: { task: TypeTaskProps }) => {
  return (
    <div className={style.task}>
      <span>{task.index + 1}</span>
      <span>{task.title}</span>
      <span>{task.description}</span>
      <Button>Просмотр</Button>
    </div>
  );
};
