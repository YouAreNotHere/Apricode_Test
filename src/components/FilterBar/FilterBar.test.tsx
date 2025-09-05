import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';

jest.mock('../../stores/Root.Store', () => ({
  filterTasks: {
    currentFilter: 'all',
    changeFilter: jest.fn(),
  },
}));

const mockChangeFilter = require('../../stores/Root.Store').filterTasks.changeFilter;

describe('FilterBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('отображает три кнопки фильтрации', () => {
    render(<FilterBar />);
    expect(screen.getByText('Показать все')).toBeInTheDocument();
    expect(screen.getByText('Показать выполненные')).toBeInTheDocument();
    expect(screen.getByText('Показать активные')).toBeInTheDocument();
  });

  test('нажатие на "Показать выполненные" вызывает changeFilter("done")', () => {
    render(<FilterBar />);
    const button = screen.getByText('Показать выполненные');
    fireEvent.click(button);
    expect(mockChangeFilter).toHaveBeenCalledWith('done');
  });

  test('активный фильтр выделяется классом "current"', () => {
    require('../../stores/Root.Store').filterTasks.currentFilter = 'active';
    render(<FilterBar />);
    expect(screen.getByText('Показать активные')).toHaveClass('current');
  });
});