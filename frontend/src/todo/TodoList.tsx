import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../api/todoApi';

export interface TodoListProps {
  todoList: Todo[] | null;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onEdit: (todo: Todo) => void;
}
const TodoList = ({
  todoList,
  onToggle,
  onRemove,
  onEdit,
}: TodoListProps): JSX.Element => {
  return (
    <div className="listWrapper">
      <ul data-testid="TodoList">
        {todoList &&
          todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          ))}
      </ul>
    </div>
  );
};
export default TodoList;
