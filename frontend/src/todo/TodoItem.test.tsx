import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem, { TodoProps } from './TodoItem';
import { Todo } from './type';

describe('<TodoItem/>', () => {
  const sampleTodo: Todo = {
    id: '1',
    text: 'TDD training',
    done: false,
  };
  const setup = ({ todo = sampleTodo, onToggle, onRemove }: TodoProps) => {
    const utils = render(
      <TodoItem todo={todo} onToggle={onToggle} onRemove={onRemove} />,
    );
    const { getByText } = utils;
    const textSpan = getByText(todo.text);
    const removeButton = getByText('×');
    return {
      ...utils,
      textSpan,
      removeButton,
    };
  };
  const onToggle = jest.fn();
  const onRemove = jest.fn();

  it('has span and button', () => {
    const { textSpan, removeButton } = setup({
      todo: sampleTodo,
      onToggle,
      onRemove,
    });
    expect(textSpan).toBeTruthy();
    expect(removeButton).toBeTruthy();
  });

  it('shows line-through when done is true', () => {
    const { textSpan } = setup({
      todo: { ...sampleTodo, done: true },
      onToggle,
      onRemove,
    });
    expect(textSpan).toHaveStyle('text-decoration: line-through;');
  });

  it('does not show line-through when done is false', () => {
    const { textSpan } = setup({
      todo: { ...sampleTodo, done: false },
      onToggle,
      onRemove,
    });
    expect(textSpan).not.toHaveStyle('text-decoration: line-through;');
  });

  it('calls onToggle', () => {
    const { textSpan } = setup({ todo: sampleTodo, onToggle, onRemove });
    fireEvent.click(textSpan);
    expect(onToggle).toBeCalledWith(sampleTodo.id);
  });

  it('calls onRemove', () => {
    const { removeButton } = setup({ todo: sampleTodo, onToggle, onRemove });
    fireEvent.click(removeButton);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  });
});
