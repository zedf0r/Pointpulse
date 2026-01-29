import { fetchTask, updateTask } from "@/entities/task/api/taskApi";
import type { TypeTask } from "@/entities/task/model/types";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { TaskForm } from "@/widgets/ui/TaskForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const EditTask = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    index: 1,
    title: "",
    description: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Editable task"],
    queryFn: () => fetchTask(id),
  });

  useEffect(() => {
    if (data) {
      setFormData({
        index: data.index,
        title: data.title,
        description: data.description,
      });
    }
  }, [data]);

  const onHandleUpdate = useMutation({
    mutationFn: ({ id, index, title, description }: TypeTask) =>
      updateTask(id, { index: index, title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      setIsOpen(false);
    },
  });

  const updateForm = (name: keyof typeof formData, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (isError) {
    return "Ошибка загрузки";
  }

  if (isLoading || !data) {
    return "Загрузка";
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={setIsOpen}
        onSubmit={() =>
          onHandleUpdate.mutate({
            id: data.id,
            index: formData.index,
            title: formData.title,
            description: formData.description,
          })
        }
      >
        <TaskForm
          title={formData.title}
          description={formData.description}
          index={formData.index}
          onIndexChange={(index) => updateForm("index", index)}
          onTitleChange={(title) => updateForm("title", title)}
          onDescriptionChange={(desc) => updateForm("description", desc)}
        />
      </Modal>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Редактировать
      </Button>
    </>
  );
};
