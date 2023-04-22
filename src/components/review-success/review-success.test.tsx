import { screen, render } from '@testing-library/react';
import ReviewSuccess from './review-success';
describe('Component: ReviewSuccess', () => {
  it('should render correctly', () => {
    render(<ReviewSuccess onContinueButtonClick={() => void 0} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });
}
);
