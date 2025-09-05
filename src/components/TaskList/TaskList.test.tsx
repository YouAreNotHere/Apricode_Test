import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

import { Task } from '../../stores/Root.Store';

jest.mock('../TaskItem/TaskItem', () => ({
  __esModule: true,
  default: function MockTaskItem({ task }: { task: Task }) {
    return <div data-testid="task-item">{task.title}</div>;
  },
}));

describe('TaskList Component', () => {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Первая задача',
      text: 'Описание первой задачи',
      parentId: null,
      subtasks: [],
    },
    {
      id: '2',
      title: 'Вторая задача',
      text: 'Описание второй задачи',
      parentId: null,
      subtasks: [],
    },
  ];

  test('отображает список задач', () => {
    render(<TaskList tasks={tasks} />);
    const items = screen.getAllByTestId('task-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Первая задача');
    expect(items[1]).toHaveTextContent('Вторая задача');
  });

  test('не рендерит задачи, если список пуст', () => {
    render(<TaskList tasks={[]} />);
    const items = screen.queryAllByTestId('task-item');
    expect(items).toHaveLength(0);
  });
});