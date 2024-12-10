import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from '../common/Avatar';


describe('Avatar Component', () => {
    it('should apply correct styles to the image and name', () => {
        render(<Avatar name="Styled User" />);

        // Перевіряємо, чи застосовано клас для зображення
        const imgElement = screen.getByRole('img', { name: 'Styled User' });
        expect(imgElement).toHaveClass('roundedImage');

        // Перевіряємо, чи застосовано клас для імені
        const nameElement = screen.getByText('Styled User');
        expect(nameElement).toHaveClass('name');
    });

    it('should set image dimensions correctly', () => {
        render(<Avatar name="Dimension User" />);

        // Перевіряємо розміри зображення
        const imgElement = screen.getByRole('img', { name: 'Dimension User' });
        expect(imgElement).toHaveAttribute('width', '40');
        expect(imgElement).toHaveAttribute('height', '40');
    });
});
