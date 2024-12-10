import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DatePicker } from '../common/DatePicker';
import { IoSearchOutline } from 'react-icons/io5';

describe('DatePicker Component', () => {
    it('does not render search icon when isSearch is false', () => {
        render(<DatePicker />);

        const icon = screen.queryByTestId('search-icon');
        expect(icon).not.toBeInTheDocument();
    });
});
