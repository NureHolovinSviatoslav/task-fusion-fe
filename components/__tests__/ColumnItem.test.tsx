import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ColumnItem, Props } from '../common/ColumnItem';
import { TaskPriority } from '@/types/enums';

describe('ColumnItem Component', () => {
    const mockProps: Props = {
        id: 1,
        title: 'Sample Task',
        rows: [
            { name: 'Assigned To', value: 'John Doe' },
            { name: 'Due Date', value: '2024-12-15' },
        ],
        priority: TaskPriority.HIGH,
        text: 'This is a sample task description.',
        author: <div data-testid="author">Author Name</div>,
        href: '/task/1',
        isDraggable: true,
    };
    

    it('renders additional text and author', () => {
        render(<ColumnItem {...mockProps} href={undefined} />);

        const text = screen.getByText(/this is a sample task description./i);
        const author = screen.getByTestId('author');

        expect(text).toBeInTheDocument();
        expect(author).toBeInTheDocument();
    });

    it('wraps the item with a Link if href is provided', () => {
        render(<ColumnItem {...mockProps} />);

        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/task/1');
    });

    it('does not render a Link if href is not provided', () => {
        render(<ColumnItem {...mockProps} href={undefined} />);

        const link = screen.queryByRole('link');
        expect(link).not.toBeInTheDocument();
    });
});
