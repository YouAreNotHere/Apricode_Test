import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

jest.mock('../../stores/Root.Store', () => ({
  taskStore: {
    tasks: [
      { id: '1', title: 'Задача', text: 'Текст', parentId: null, subtasks: [] },
    ],
    selectedTaskAndTitle: null,
    checkedTasksIds: new Set(),
    checkTask: jest.fn(),
    removeTask: jest.fn(),
    addToSelected: jest.fn(),
  },
  showAddTask: {
    idToAdd: null,
    changeIdToAdd: jest.fn(),
  },
  filterTasks: {
    currentFilter: 'all',
  },
}));

const mockCheckTask = require('../../stores/Root.Store').taskStore.checkTask;
const mockRemoveTask = require('../../stores/Root.Store').taskStore.removeTask;
const mockAddToSelected = require('../../stores/Root.Store').taskStore.addToSelected;

describe('TaskItem Component', () => {
  const task = { id: '1', title: 'Задача', text: 'Текст', parentId: null, subtasks: [] };

  test('отображает задачу с заголовком и кнопками', () => {
    render(<TaskItem task={task} index={0} />);
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
  });

  test('чекбокс вызывает checkTask при изменении', () => {
    render(<TaskItem task={task} index={0} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockCheckTask).toHaveBeenCalledWith(task);
  });

  test('кнопка удаления вызывает removeTask', () => {
    render(<TaskItem task={task} index={0} />);
    const deleteButton = screen.getAllByRole('button')[1]; // Удалить
    fireEvent.click(deleteButton);
    expect(mockRemoveTask).toHaveBeenCalledWith(task);
  });

  test('клик по заголовку вызывает addToSelected', () => {
    render(<TaskItem task={task} index={0} />);
    const title = screen.getByText('Задача 1');
    fireEvent.click(title);
    expect(mockAddToSelected).toHaveBeenCalledWith({ task, title: 'Задача 1' });
  });

  test('если фильтр "done", невыполненные задачи не отображаются', () => {
    require('../../stores/Root.Store').filterTasks.currentFilter = 'done';
    render(<TaskItem task={task} index={0} />);
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  });
});