import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import TodoApp from './TodoApp';
import { BASE_URI } from '../api/todoApi';

describe('<TodoApp/>', () => {
  const mock = new MockAdapter(axios, { delayResponse: 200 });
  mock.onGet(`${BASE_URI}/tasks`).reply(200, [
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
  ]);
  mock.onPost(`${BASE_URI}/tasks`).reply(200, {
    id: 3,
    createdAt: '2021-08-17T11:40:25.528669',
    updatedAt: '2021-08-17T11:40:25.528709',
    content: 'new Todo',
    done: false,
  });

  mock.onPut(`${BASE_URI}/tasks/2`).reply(200, {
    id: 2,
    createdAt: '2021-08-18T10:22:46.657558',
    updatedAt: '2021-08-18T10:22:46.657605',
    content: 'edit my todo',
    done: false,
  });

  mock.onPatch(`${BASE_URI}/tasks/2`).reply(200);

  mock.onDelete(`${BASE_URI}/tasks/2`).reply(200);

  it('loads TodoList properly', async () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    await waitFor(() => expect(getByTestId('loader')).toBeTruthy());
    await waitFor(() => expect(getByText('TDD Training')).toBeTruthy());
  });

  it('add new todo', async () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    await waitFor(() =>
      expect(getByPlaceholderText('Add a task')).toBeTruthy(),
    );
    await fireEvent.change(getByPlaceholderText('Add a task'), {
      target: {
        value: 'new Todo',
      },
    });
    await waitFor(() => expect(getByText('+')).toBeTruthy());
    await fireEvent.click(getByText('+'));
    await waitFor(() => expect(getByText('new Todo')).toBeInTheDocument());
  });

  it('edit todo', async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { getByTestId, getAllByTestId, getByText } = render(<TodoApp />);
    const editButton = await waitFor(() => getAllByTestId('edit'));
    if (!editButton) return;
    fireEvent.click(editButton[1]);
    const editInput = await waitFor(() => getByTestId('editInput'));
    fireEvent.change(editInput, {
      target: {
        value: 'edit my todo',
      },
    });
    const saveButton = await getByTestId('saveButton');
    fireEvent.click(saveButton);
    const onEdit = jest.fn();
    await waitFor(() => expect(onEdit));
    await waitFor(() => expect(getByText('edit my todo')).toBeInTheDocument());
  });

  it('removes todo', async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { getByText, getAllByText } = render(<TodoApp />);

    await waitFor(() => expect(getByText('go back home')).toBeTruthy());
    const todoText = getByText('go back home');

    // remove todo
    const removeButton = getAllByText('×');

    if (!removeButton) return;
    fireEvent.click(removeButton[1]);
    await waitFor(() => expect(todoText).not.toBeInTheDocument());
  });

  it('toggles todo done', async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { getByText, getAllByTestId } = render(<TodoApp />);

    await waitFor(() => expect(getByText('go back home')).toBeTruthy());
    const textSpan = getByText('go back home');

    // toggle todo
    const toggleButton = getAllByTestId('toggle');

    if (!toggleButton) return;
    fireEvent.click(toggleButton[1]);

    await waitFor(() =>
      expect(textSpan).not.toHaveStyle('text-decoration: line-through;'),
    );
  });
});