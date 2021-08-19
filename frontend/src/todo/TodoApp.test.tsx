import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import TodoApp from './TodoApp';
import TodoAPI, { BASE_URI, Todo } from '../api/todoApi';

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

  it('toggles todo done', () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    /*
    fireEvent.change(getByPlaceholderText('Add a task'), {
      target: {
        value: 'new Todo',
      },
    });
    fireEvent.click(getByText('+'));
    const spanText = getByText('new Todo');

    // toggle todo
    fireEvent.click(spanText);
    expect(spanText).toHaveStyle('text-decoration: line-through;');

    fireEvent.click(spanText);
    expect(spanText).not.toHaveStyle('text-decoration: line-through;');
    */
  });

  it('removes todo', () => {
    /*
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    // add todo
    fireEvent.change(getByPlaceholderText('Add a task'), {
      target: {
        value: 'new Todo',
      },
    });
    fireEvent.click(getByText('+'));
    const spanText = getByText('new Todo');

    // remove todo
    const removeButton = spanText.nextSibling;

    if (!removeButton) return;
    fireEvent.click(removeButton);
    expect(spanText).not.toBeInTheDocument(); // 페이지에서 사라졌음을 의미함
    */
  });
});
