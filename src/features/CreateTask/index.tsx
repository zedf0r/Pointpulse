import { addTask } from "@/entities/task/api/taskApi";
import type { TypeTask } from "@/entities/task/model/types";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { TaskForm } from "@/widgets/ui/TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export const CreateTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    index: 1,
    title: "",
    description: "",
  });
  const queryClient = useQueryClient();

  const handleUpdateForm = (name: keyof typeof formData, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    return () => {
      document.body.style.overflowY = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  const addedTask = useMutation({
    mutationKey: ["Add task"],
    mutationFn: ({ id, index, title, description }: TypeTask) =>
      addTask({
        id: id,
        index: index,
        title: title,
        description: description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsOpen(false);
      setFormData({ index: 1, title: "", description: "" });
    },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={setIsOpen}
        onSubmit={() =>
          addedTask.mutate({
            id: v4(),
            index: Number(formData.index),
            title: formData.title,
            description: formData.description,
          })
        }
      >
        <h3>Создать задачу</h3>
        <TaskForm
          title={formData.title}
          description={formData.description}
          index={formData.index}
          onIndexChange={(index) => {
            handleUpdateForm("index", index);
          }}
          onTitleChange={(title) => {
            handleUpdateForm("title", title);
          }}
          onDescriptionChange={(desc) => handleUpdateForm("description", desc)}
        />
      </Modal>
      <Button onClick={() => setIsOpen(true)}>Создать</Button>
    </>
  );
};
