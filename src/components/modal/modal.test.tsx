import { screen, render } from '@testing-library/react';
import Modal from './modal';
const title = 'Оставить отзыв';
describe('Component: Modal', () => {
  it('should render correctly', () => {
    render(<Modal openModalWindow={() => void 0} title={title} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });
}
);
