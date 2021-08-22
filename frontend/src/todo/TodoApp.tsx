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
      setError(String(e));
    }
    setLoading(false);
  };

  const onEdit = async (editedTodo: Todo) => {
    try {
      if (!todoList) return;
      const todoResult = await todoAPI.todoPut(editedTodo);
      setTodoList(
        todoList?.map((todo) =>
          todo.id === todoResult.id
            ? {
                ...todoResult,
              }
            : todo,
        ),
      );
    } catch (e) {
      setError(String(e));
    }
    setLoading(false);
  };

  const onToggle = async (todoId: number) => {
    try {
      if (!todoList) return;
      const payload = {
        done: !todoList.filter((todo) => todo.id === todoId)[0].done,
      };
      const todoResult = await todoAPI.todoToggle(todoId, payload);
      setTodoList(
        todoList?.map((todo) =>
          todo.id === todoResult.id
            ? {
                ...todo,
                done: todoResult.done,
              }
            : todo,
        ),
      );
    } catch (e) {
      setError(String(e));
    }
    setLoading(false);
  };

  const onRemove = async (todoId: number) => {
    try {
      if (!todoList) return;
      await todoAPI.todoDelete(todoId);
    } catch (e) {
      setError(String(e));
    }
    setLoading(false);
    setTodoList(todoList?.filter((todo) => todo.id !== todoId) || null);
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
        <TodoList
          todoList={todoList}
          onToggle={onToggle}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      </div>
    </>
  );
};

export default TodoApp;
