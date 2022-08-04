import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import ProfileStatus from './ProfileStatus.jsx';

describe('profile status tests', () => {
	it('check if edit activates', () => {
		const { getByTestId } = render(<ProfileStatus />);
		const statusText = getByTestId('status-text');

		fireEvent.click(statusText);
		expect(getByTestId('status-input')).toBeInTheDocument();
		expect(statusText).not.toBeInTheDocument();
	});

	it('check if edit deactivates', () => {
		const { getByTestId } = render(<ProfileStatus isMyProfile/>);
		fireEvent.click(getByTestId('status-text'));
		
		const textarea = getByTestId('status-input');
		fireEvent.blur(textarea);

		expect(getByTestId('status-text')).toBeInTheDocument();
		expect(getByTestId('status-input')).not.toBeInTheDocument();
		
	});
	
	it('test if status changes in local state', () => {
		const { getByText, getByTestId } = render(<ProfileStatus status='Hi' setMyStatus={jest.fn(() => {})} isMyProfile/>);
		fireEvent.click(getByText('Hi'));

		const textarea = getByTestId('status-input');
		fireEvent.change(textarea, {
			target: {value: 'New Hi'}
		});
		fireEvent.blur(textarea);

		expect(getByText('New Hi')).toBeInTheDocument();
	});
	
});