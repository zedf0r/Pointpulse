import style from "./style.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { TypeTask } from "@/entities/task/model/types";
import { fetchTask } from "@/entities/task/api/taskApi";

import { EditTask } from "@/features/EditTask";
import { DeleteTask } from "@/features/DeleteTask";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<TypeTask>({
    queryKey: ["task", id],
    queryFn: () => fetchTask(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return "Загрузка";
  }

  if (error || !data) {
    return "Ошибка загрузки";
  }

  return (
    <div className="container">
      <div className={style.task}>
        <div className={style.task__header}>
          <div className={style.button__back} onClick={() => navigate(-1)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 className={style.task__number}>Task {data.index}</h1>
        </div>
        <div className={style.task__main}>
          <h2 className={style.title}>{data.title}</h2>
          <p className={style.description}>{data.description}</p>
        </div>
        <div className={style.task__action}>
          <EditTask id={id!} />
          <DeleteTask id={id!} />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
