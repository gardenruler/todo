import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from './type';

export interface TodoListProps {
  todoList: Todo[];
}
const TodoList = ({ todoList }: TodoListProps): JSX.Element => {
  const onToggle = (id: string) => {
    console.log(id);
  };
  const onRemove = (id: string) => {
    console.log(id);
  };
  return (
    <div className="listWrapper">
      <ul>
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
