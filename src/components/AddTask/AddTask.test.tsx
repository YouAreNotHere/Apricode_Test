import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from './AddTask';

jest.mock('../../stores/Root.Store', () => ({
  __esModule: true,
  taskStore: {
    addTask: jest.fn(),
  },
  showAddTask: {
    changeIdToAdd: jest.fn(),
  },
}));

jest.mock('../../shared', () => ({
  __esModule: true,
  Button: ({ onClickHandler, children, ...props }: any) => (
    <button
      {...props}
      onClick={onClickHandler}
      data-testid="mock-button"
    >
      {children}
    </button>
  ),
}));

jest.mock('../../shared/Button/SuggestButton', () => ({
  __esModule: true,
  default: () => <svg data-testid="suggest-icon" />,
}));

const mockAddTask = require('../../stores/Root.Store').taskStore.addTask;
const mockChangeIdToAdd = require('../../stores/Root.Store').showAddTask.changeIdToAdd;

describe('AddTask Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('отображает поле ввода и кнопки', () => {
    render(<AddTask />);
    expect(screen.getByPlaceholderText('Название задачи')).toBeInTheDocument();
    expect(screen.getByTitle('Добавить выбранное задание')).toBeInTheDocument();
    expect(screen.getByTitle('Отменить добавление задания')).toBeInTheDocument();
  });

  test('ввод текста обновляет значение в поле', () => {
    render(<AddTask />);
    const input = screen.getByPlaceholderText('Название задачи');
    fireEvent.change(input, { target: { value: 'Новая задача' } });
    expect(input).toHaveValue('Новая задача');
  });

  test('нажатие кнопки "Добавить" вызывает addTask с корректными данными', () => {
    render(<AddTask />);
    const input = screen.getByPlaceholderText('Название задачи');

    const buttons = screen.getAllByTestId('mock-button');
    const addButton = buttons[0]; // Первая — это suggest-task-button

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);

    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'Задача',
      text: 'Тестовая задача',
      parentId: null,
      subtasks: [],
    });
  });

  test('нажатие кнопки "Отмена" вызывает changeIdToAdd с null', () => {
    render(<AddTask />);

    const buttons = screen.getAllByTestId('mock-button');
    const cancelButton = buttons[1];

    fireEvent.click(cancelButton);

    expect(mockChangeIdToAdd).toHaveBeenCalledTimes(1);
    expect(mockChangeIdToAdd).toHaveBeenCalledWith(null);
  });


});