import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/entities/task/api/taskApi";
import { useNavigate } from "react-router-dom";

export const DeleteTask = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onHandleDelete = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsOpen(false);
      navigate(-1);
    },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={setIsOpen}
        onSubmit={() => onHandleDelete.mutate({ id })}
      >
        <p>Вы точно хотите удалить задачу?</p>
      </Modal>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Удалить
      </Button>
    </>
  );
};
