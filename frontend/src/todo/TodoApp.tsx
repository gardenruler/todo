import React, { useState, useRef } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { Todo } from './type';

const TodoApp = (): JSX.Element => {
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      id: '1',
      text: 'TDD 배우기',
      done: false,
    },
    {
      id: '2',
      text: 'react-testing-library 배우기',
      done: true,
    },
  ]);
  const nextId = useRef('3');
  const onInsert = (todoText: string) => {
    setTodoList([
      ...todoList,
      {
        id: nextId.current,
        text: todoText,
        done: false,
      },
    ]);
    nextId.current = String(Number(nextId.current) + 1);
  };
  const onToggle = (todoId: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };
  const onRemove = (todoId: string) => {
    setTodoList(todoList.filter((todo) => todo.id !== todoId));
  };
  return (
    <div className="main">
      <TodoInput onInsert={onInsert} />
      <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
    </div>
  );
};

export default TodoApp;
