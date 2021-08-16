import React from 'react';
import { render } from '@testing-library/react';
import TodoList from './TodoList';
import { Todo } from './type';

describe('<TodoList/>', () => {
  const sampleTodolist: Todo[] = [
    {
      id: '1',
      text: 'TDD training',
      done: false,
    },
    {
      id: '2',
      text: 'going to home',
      done: true,
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
    expect(getByText(sampleTodolist[0].text)).toBeTruthy();
    expect(getByText(sampleTodolist[1].text)).toBeTruthy();
  });
});
