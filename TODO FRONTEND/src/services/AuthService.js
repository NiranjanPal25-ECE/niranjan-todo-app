const API_URL = import.meta.env.VITE_API_URL;

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const saveToken = (token) => {
  localStorage.setItem("todo_token", token);
};

export const getToken = () => {
  return localStorage.getItem("todo_token");
};

export const removeToken = () => {
  localStorage.removeItem("todo_token");
};

export const getCurrentUser = async () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    removeToken();
    return null;
  }

  return response.json();
};