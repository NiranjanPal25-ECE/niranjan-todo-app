import { getToken } from "./AuthService";

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const addItemToServer = async (task, date) => {
  const response = await fetch(`${API_URL}/api/todo`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      task,
      date,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  return mapServerItemToTodoItem(
    await response.json()
  );
};

export const getItemsFromServer = async () => {
  const response = await fetch(`${API_URL}/api/todo`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to get todos");
  }

  const serverItems = await response.json();

  return serverItems.map(mapServerItemToTodoItem);
};

export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(
    `${API_URL}/api/todo/${id}/completed`,
    {
      method: "PUT",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to complete todo");
  }

  const item = await response.json();

  return mapServerItemToTodoItem(item);
};

export const deleteItemFromServer = async (id) => {
  const response = await fetch(
    `${API_URL}/api/todo/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return id;
};

const mapServerItemToTodoItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};