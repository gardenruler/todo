import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TodoItem, { TodoProps } from './TodoItem';
import { Todo } from '../api/todoApi';

describe('<TodoItem/>', () => {
  const sampleTodo: Todo = {
    id: 1,
    createdAt: '2021-08-17T11:40:25.528669',
    updatedAt: '2021-08-17T11:40:25.528709',
    content: 'TDD Training',
    done: false,
  };
  const setup = ({
    todo = sampleTodo,
    onToggle,
    onRemove,
    onEdit,
  }: TodoProps) => {
    const utils = render(
      <TodoItem
        todo={todo}
        onToggle={onToggle}
        onRemove={onRemove}
        onEdit={onEdit}
      />,
    );
    const { getByText, getByTestId } = utils;
    const textSpan = getByText(todo.content);
    const removeButton = getByText('×');
    const toggleButton = getByTestId('toggle');
    const editButton = getByTestId('edit');
    return {
      ...utils,
      textSpan,
      removeButton,
      toggleButton,
      editButton,
    };
  };
  const onToggle = jest.fn();
  const onRemove = jest.fn();
  const onEdit = jest.fn();

  it('has span and buttons', () => {
    const { textSpan, removeButton, toggleButton, editButton } = setup({
      todo: sampleTodo,
      onToggle,
      onRemove,
      onEdit,
    });
    expect(textSpan).toBeTruthy();
    expect(removeButton).toBeTruthy();
    expect(toggleButton).toBeTruthy();
    expect(editButton).toBeTruthy();
  });

  it('shows line-through when done is true', () => {
    const { textSpan } = setup({
      todo: { ...sampleTodo, done: true },
      onToggle,
      onRemove,
      onEdit,
    });
    expect(textSpan).toHaveStyle('text-decoration: line-through;');
  });

  it('does not show line-through when done is false', () => {
    const { textSpan } = setup({
      todo: { ...sampleTodo, done: false },
      onToggle,
      onRemove,
      onEdit,
    });
    expect(textSpan).not.toHaveStyle('text-decoration: line-through;');
  });

  it('show edit input save button when click edit button', async () => {
    const { getByTestId, editButton } = setup({
      todo: sampleTodo,
      onToggle,
      onRemove,
      onEdit,
    });
    fireEvent.click(editButton);
    const editInput = await getByTestId('editInput');
    const saveButton = await getByTestId('saveButton');
    await waitFor(() => expect(editInput).toHaveValue(sampleTodo.content));
    await waitFor(() => expect(saveButton).toBeInTheDocument());
  });

  it('calls onEdit', async () => {
    const { getByTestId, editButton } = setup({
      todo: sampleTodo,
      onToggle,
      onRemove,
      onEdit,
    });
    fireEvent.click(editButton);
    const editInput = await getByTestId('editInput');
    fireEvent.change(editInput, {
      target: {
        value: 'changed my todo',
      },
    });
    const saveButton = await getByTestId('saveButton');
    fireEvent.click(saveButton);

    expect(onEdit).toBeCalledWith({
      ...sampleTodo,
      content: 'changed my todo',
    });
  });

  it('calls onToggle', () => {
    const { toggleButton } = setup({
      todo: sampleTodo,
      onToggle,
      onRemove,
      onEdit,
    });
    fireEvent.click(toggleButton);
    expect(onToggle).toBeCalledWith(sampleTodo.id);
  });

  it('calls onRemove', () => {
    const { removeButton } = setup({
      todo: sampleTodo,
      onToggle,
      onRemove,
      onEdit,
    });
    fireEvent.click(removeButton);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  });
});
