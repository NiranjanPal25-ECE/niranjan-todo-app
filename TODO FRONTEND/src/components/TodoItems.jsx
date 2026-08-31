import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onCompleteClick, onDeleteClick }) => {
  return (
    <div className="mt-6 space-y-3">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          completed={item.completed}
          onCompleteClick={onCompleteClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default TodoItems;
