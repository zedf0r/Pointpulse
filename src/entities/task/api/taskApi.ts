const API_BASED = "http://localhost:3000/tasks";
const headers = { "Content-Type": "application/json" };

export const fetchTasks = async () => {
  const response = await fetch(API_BASED, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки");
  }
  return response.json();
};

export const fetchTask = async (id: string) => {
  const response = await fetch(`${API_BASED}/${id}`, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Ошибка получения задачи");
  }
  return response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`${API_BASED}/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Ошибка удаления задачи");
  }
  return response;
};

export const updateTask = async (
  id: string,
  body: { title: string; description: string; index: number },
) => {
  const response = await fetch(`${API_BASED}/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Ошибка обновления задачи");
  }
  return response;
};

export const addTask = async (body: {
  id: string;
  title: string;
  description: string;
  index: number;
}) => {
  const response = await fetch(`${API_BASED}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Ошибка обновления задачи");
  }
  return response;
};
