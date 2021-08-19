import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import todoAPI, { Todo } from '../api/todoApi';

const TodoApp = (): JSX.Element => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState<Todo[] | null>(null);

  useEffect(() => {
    const onLoadTodoList = async () => {
      setLoading(true);
      try {
        const todoResult = await todoAPI.todoList();
        setTodoList(todoResult);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    onLoadTodoList();
  }, []);

  const onInsert = async (todoText: string) => {
    try {
      const todoResult = await todoAPI.todoInsert({ content: todoText });
      setTodoList(todoList ? [...todoList, todoResult] : [todoResult]);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  const onToggle = (todoId: number) => {
    /*
    setTodoList(
      todoList.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo,
      ),
    );
    */
  };
  const onRemove = (todoId: number) => {
    /*
    setTodoList(todoList.filter((todo) => todo.id !== todoId));
    */
  };

  if (error) return <div>{error}</div>;

  if (loading)
    return (
      <div className="loadingWrapper" data-testid="loader">
        <div className="loader"> </div>
      </div>
    );

  return (
    <>
      <h1>TODO</h1>
      <div className="main">
        <TodoInput onInsert={onInsert} />
        <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
      </div>
    </>
  );
};

export default TodoApp;
