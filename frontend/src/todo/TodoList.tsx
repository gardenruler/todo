import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from './type';

export interface TodoListProps {
  todoList: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}
const TodoList = ({
  todoList,
  onToggle,
  onRemove,
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
            />
          ))}
      </ul>
    </div>
  );
};
export default TodoList;
