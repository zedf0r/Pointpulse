import style from "./style.module.scss";
import { CreateTask } from "@/features/CreateTask";
import { TaskList } from "@/widgets/ui/TaskList";

const HomePage = () => {
  return (
    <div className={`container ${style.home}`}>
      <CreateTask />
      <TaskList />
    </div>
  );
};

export default HomePage;
