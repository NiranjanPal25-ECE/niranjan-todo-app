import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import {
  addItemToServer,
  getItemsFromServer,
  deleteItemFromServer,
  markItemCompletedOnServer,
} from "./services/ItemService";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const sortedTodoItems = [...todoItems].sort(
    (firstItem, secondItem) =>
      Number(firstItem.completed) - Number(secondItem.completed)
  );
  const activeTaskCount = todoItems.filter((item) => !item.completed).length;

  useEffect(() => {
    getItemsFromServer().then((initialItems) => {
      setTodoItems(initialItems);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item = await addItemToServer(itemName, itemDueDate);
    const newTodoItems = [...todoItems, item];
    setTodoItems(newTodoItems);
  };

  const handleCompleteItem = async (id) => {
    const completedItem = await markItemCompletedOnServer(id);
    const newTodoItems = todoItems.map((item) =>
      item.id === completedItem.id ? completedItem : item
    );
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col justify-center">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur sm:p-8">
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
