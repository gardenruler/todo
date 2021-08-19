import React from 'react';
import { render } from '@testing-library/react';
import TodoList from './TodoList';
import { Todo } from '../api/todoApi';

describe('<TodoList/>', () => {
  const sampleTodolist: Todo[] = [
    {
      id: 1,
      createdAt: '2021-08-17T11:40:25.528669',
      updatedAt: '2021-08-17T11:40:25.528709',
      content: 'TDD Training',
      done: false,
    },
    {
      id: 2,
      createdAt: '2021-08-18T10:22:46.657558',
      updatedAt: '2021-08-18T10:22:46.657605',
      content: 'go back home',
      done: false,
    },
  ];

  const onToggle = jest.fn();
  const onRemove = jest.fn();
  it('renders TodoList properly', () => {
    const { getByText } = render(
      <TodoList
        todoList={sampleTodolist}
        onToggle={onToggle}
        onRemove={onRemove}
      />,
    );
    expect(getByText(sampleTodolist[0].content)).toBeTruthy();
    expect(getByText(sampleTodolist[1].content)).toBeTruthy();
  });
});
