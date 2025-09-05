// Моки stores
jest.mock('./stores/Root.Store', () => ({
  __esModule: true,
  taskStore: {
    tasks: [],
    selectedTaskAndTitle: null,
    checkedTasksIds: new Set(),
    deleteCheckedTasks: jest.fn(),
    addToSelected: jest.fn(),
  },
  showAddTask: {
    idToAdd: null,
    changeIdToAdd: jest.fn(),
  },
}));

// Моки компонентов
jest.mock('./components/TaskList/TaskList', () => ({
  __esModule: true,
  default: () => <div data-testid="task-list">Task List</div>,
}));

jest.mock('./components/FilterBar/FilterBar', () => ({
  __esModule: true,
  default: () => <div>FilterBar</div>,
}));

jest.mock('./components/SelectedTaskSection/SelectedTaskSection', () => ({
  __esModule: true,
  default: () => <div>SelectedTaskSection</div>,
}));

// ✅ Ключевой мок: Button передаёт onClickHandler как onClick
jest.mock('./shared/Button/Button', () => ({
  __esModule: true,
  Button: ({ children, text, onClickHandler, ...props } : any) => (
    <button {...props} onClick={onClickHandler}>
      {children || text}
    </button>
  ),
}));

// Импорты после моков
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const mockChangeIdToAdd = require('./stores/Root.Store').showAddTask.changeIdToAdd;
const mockDeleteCheckedTasks = require('./stores/Root.Store').taskStore.deleteCheckedTasks;

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('отображает основной интерфейс', () => {
    render(<App />);
    expect(screen.getByText('Список задач')).toBeInTheDocument();
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
    expect(screen.getByText('FilterBar')).toBeInTheDocument();
  });

  test('кнопка "Добавить задачу" вызывает changeIdToAdd(-1)', () => {
    render(<App />);
    const button = screen.getByText('Добавить задачу');
    fireEvent.click(button);
    expect(mockChangeIdToAdd).toHaveBeenCalledWith('-1');
  });

  test('кнопка "Удалить выполненные" вызывает deleteCheckedTasks', () => {
    Object.defineProperty(require('./stores/Root.Store').taskStore, 'checkedTasksIds', {
      value: new Set(['1']),
    });
    render(<App />);
    const button = screen.getByText('Удалить выполненные');
    expect(button).not.toHaveClass('hidden');
    fireEvent.click(button);
    expect(mockDeleteCheckedTasks).toHaveBeenCalled();
  });
});