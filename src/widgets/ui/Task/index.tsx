import { Button } from "@/shared/ui/Button";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import type { TypeTask } from "@/entities/task/model/types";

export const Task = ({ task }: { task: TypeTask }) => {
  const navigate = useNavigate();
  return (
    <div className={style.task}>
      <span>{task.index}</span>
      <span>{task.title}</span>
      <span>{task.description}</span>
      <Button onClick={() => navigate(`/task/${task.id}`)}>Просмотр</Button>
    </div>
  );
};
