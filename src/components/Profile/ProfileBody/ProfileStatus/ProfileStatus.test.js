import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { create } from 'react-test-renderer';
import ProfileStatus from '.';

describe('profile status tests without edit mode', () => {

	it('check if edit activates', () => {
		const {queryByTestId, getByTestId } = render(<ProfileStatus isMyProfile/>);

		//is Edit
		fireEvent.click(queryByTestId('status-text'));

		expect(queryByTestId('status-textarea')).toBeInTheDocument();
		expect(queryByTestId('status-text')).toBeNull();

	});
	it('check if status renders correctly', () => {
		const {queryByTestId, getByText } = render(<ProfileStatus status='Hi'/>);
		
		expect(queryByTestId('status-textarea')).toBeNull();
		expect(getByText('Hi')).toBeInTheDocument();
	});
	
});

describe('profile status tests with edit mode', () => {

	it('check if status changes after textarea change', () => {
		const { queryByTestId,  getByTestId } = render(<ProfileStatus updateMyStatus={() => {}} isMyProfile/>);
		let statusText = getByTestId('status-text');

		fireEvent.click(statusText);

		let textarea = queryByTestId('status-textarea');

		fireEvent.change(textarea, {
			target: {value: 'New Hi'}
		});

		expect(textarea.value).toBe('New Hi');

		fireEvent.blur(textarea);

		statusText = getByTestId('status-text');
		expect(statusText.textContent).toBe('New Hi');
	});

	it('check if edit deactivates', () => {
		const { queryByTestId,  getByTestId } = render(<ProfileStatus isMyProfile/>);
		let statusText = getByTestId('status-text');

		fireEvent.click(statusText);

		let textarea = queryByTestId('status-textarea');

		//not edit
		fireEvent.blur(textarea);

		expect(queryByTestId('status-text')).toBeInTheDocument();
		expect(queryByTestId('status-textarea')).toBeNull();
	});
});

