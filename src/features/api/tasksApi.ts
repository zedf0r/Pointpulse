export const tasksApi = async () => {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки");
  }
  return response.json();
};
