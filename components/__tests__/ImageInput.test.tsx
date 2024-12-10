import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageInput } from '../common/ImageInput';

describe('ImageInput Component', () => {
    it('renders with placeholder and no file initially', () => {
        const setFileMock = jest.fn();

        render(<ImageInput file={null} setFile={setFileMock} />);

        // Placeholder image should be visible
        const placeholderImage = screen.getByAltText('Avatar');
        expect(placeholderImage).toBeInTheDocument();

        // Text should say "No file chosen"
        const noFileText = screen.getByText('No file chosen');
        expect(noFileText).toBeInTheDocument();

        // Button text should say "Choose File"
        const button = screen.getByRole('button', { name: /choose file/i });
        expect(button).toBeInTheDocument();
    });
});
