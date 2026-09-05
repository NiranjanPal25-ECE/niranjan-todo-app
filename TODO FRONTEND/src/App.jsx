import { useEffect, useState } from "react";

import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import Login from "./components/Login";

import {
  addItemToServer,
  getItemsFromServer,
  deleteItemFromServer,
  markItemCompletedOnServer,
} from "./services/ItemService";

import {
  getCurrentUser,
  getToken,
  removeToken,
  saveToken,
} from "./services/AuthService";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const params = new URLSearchParams(
          window.location.search
        );

        const token = params.get("token");

        if (token) {
          saveToken(token);

          window.history.replaceState(
            {},
            document.title,
            "/"
          );
        }

        const currentToken = getToken();

        if (!currentToken) {
          setLoading(false);
          return;
        }

        const currentUser = await getCurrentUser();

        if (!currentUser) {
          removeToken();
          setLoading(false);
          return;
        }

        setUser(currentUser);

        const initialItems =
          await getItemsFromServer();

        setTodoItems(initialItems);
      } catch (error) {
        console.error(error);
        removeToken();
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const sortedTodoItems = [...todoItems].sort(
    (firstItem, secondItem) =>
      Number(firstItem.completed) -
      Number(secondItem.completed)
  );

  const activeTaskCount = todoItems.filter(
    (item) => !item.completed
  ).length;

  const handleNewItem = async (
    itemName,
    itemDueDate
  ) => {
    try {
      const item = await addItemToServer(
        itemName,
        itemDueDate
      );

      setTodoItems((currentItems) => [
        ...currentItems,
        item,
      ]);
    } catch (error) {
      console.error(error);
      alert("Unable to add task");
    }
  };

  const handleCompleteItem = async (id) => {
    try {
      const completedItem =
        await markItemCompletedOnServer(id);

      setTodoItems((currentItems) =>
        currentItems.map((item) =>
          item.id === completedItem.id
            ? completedItem
            : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to complete task");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const deletedId =
        await deleteItemFromServer(id);

      setTodoItems((currentItems) =>
        currentItems.filter(
          (item) => item.id !== deletedId
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to delete task");
    }
  };

  const handleLogout = () => {
    removeToken();
    setUser(null);
    setTodoItems([]);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col justify-center">
        
        <div className="rounded-4xl border border-white/10 bg-white/6 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur sm:p-8">

          <div className="mb-6 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              {user.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
              )}

              <div>
                <p className="text-sm font-semibold text-white">
                  {user.name}
                </p>

                <p className="text-xs text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Logout
            </button>
          </div>

          <AppName
            taskCount={todoItems.length}
            activeTaskCount={activeTaskCount}
          />

          <AddTodo onNewItem={handleNewItem} />

          {todoItems.length === 0 ? (
            <WelcomeMessage />
          ) : (
            <TodoItems
              todoItems={sortedTodoItems}
              onCompleteClick={handleCompleteItem}
              onDeleteClick={handleDeleteItem}
            />
          )}

        </div>
      </section>
    </main>
  );
}

export default App;