import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Details } from '../common/Details';

describe('Details Component', () => {
    it('renders string details correctly', () => {
        render(<Details details="This is a detail" stringDetailsHeading="Heading" />);

        // Check that the heading is displayed
        const heading = screen.getByText('Heading:');
        expect(heading).toBeInTheDocument();

        // Check that the detail string is displayed
        const detail = screen.getByText('This is a detail');
        expect(detail).toBeInTheDocument();
    });

    it('renders without heading when stringDetailsHeading is not provided', () => {
        render(<Details details="This is a detail" />);

        // Heading should not be present
        const heading = screen.queryByText(/Heading:/);
        expect(heading).not.toBeInTheDocument();

        // Detail string should still be displayed
        const detail = screen.getByText('This is a detail');
        expect(detail).toBeInTheDocument();
    });

    it('renders a list of details correctly', () => {
        const details = [
            { title: 'Name', value: 'John Doe' },
            { title: 'Age', value: 30 },
            { title: 'Occupation', value: 'Engineer' },
        ];

        render(<Details details={details} />);

        // Check that all titles and values are displayed
        details.forEach((detail) => {
            expect(screen.getByText(`${detail.title}:`)).toBeInTheDocument();
            expect(screen.getByText(detail.value)).toBeInTheDocument();
        });
    });
});
