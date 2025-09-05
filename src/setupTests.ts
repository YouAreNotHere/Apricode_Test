import '@testing-library/jest-dom';

jest.mock('mobx-react-lite', () => {
  const actual = jest.requireActual('mobx-react-lite');
  return {
    ...actual,
    observer: (component: React.FC) => component, // Просто возвращает компонент без обёртки
  };
});
