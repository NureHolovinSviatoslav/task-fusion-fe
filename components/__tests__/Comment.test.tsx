import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Comment } from '../common/Comment';
import { formatDate } from '@/utils/helpers';
import { Avatar } from '../common/Avatar';

describe('Comment Component', () => {
    const mockProps = {
        name: 'John Doe',
        text: 'This is a comment.',
        date: new Date('2024-12-10T10:30:00Z'),
    };
    
    it('displays "No text" if the text is empty', () => {
        render(<Comment {...mockProps} text="" />);

        const text = screen.getByText(/no text/i);
        expect(text).toBeInTheDocument();
    });
});
