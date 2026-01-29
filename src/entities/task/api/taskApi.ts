const API_BASED = "http://localhost:3000/tasks";
const headers = { "Content-Type": "application/json" };

const request = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_BASED}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса ${response.status}` || "Ошибка сервера");
  }

  return response.json();
};

export const fetchTasks = () => request("/");

export const fetchTask = (id: string) => request(`/${id}`);

export const deleteTask = (id: string) =>
  request(`/${id}`, {
    method: "DELETE",
  });

export const updateTask = (
  id: string,
  body: { title: string; description: string; index: number },
) =>
  request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const addTask = (body: {
  id: string;
  title: string;
  description: string;
  index: number;
}) =>
  request(`/`, {
    method: "POST",
    body: JSON.stringify(body),
  });
