const API_URL = import.meta.env.VITE_API_URL;

export const addItemToServer = async (task, date) => {
    const response = await fetch(`${API_URL}/api/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task, date }),
    });
    return mapServerItemToTodoItem(await response.json());
};

export const getItemsFromServer = async () => {
    const response = await fetch(`${API_URL}/api/todo`);
    const serverItems = await response.json();
    return serverItems.map(mapServerItemToTodoItem);
}

export const markItemCompletedOnServer = async (id) => {
    const response = await fetch(`${API_URL}/api/todo/${id}/completed`, {
        method: 'PUT',
    });
    const item = await response.json();
    return mapServerItemToTodoItem(item);
}

export const deleteItemFromServer = async (id) => {
    await fetch(`${API_URL}/api/todo/${id}`, {
        method: 'DELETE',
    });
    
    return id;
}

const mapServerItemToTodoItem = (serverItem) => {
    return {
        id: serverItem._id,
        name: serverItem.task,
        dueDate: serverItem.date,
        completed: serverItem.completed,
        createdAt: serverItem.createdAt,
        updatedAt: serverItem.updatedAt,
    };
}