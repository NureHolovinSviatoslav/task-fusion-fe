import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../common/Button';

describe('Button Component', () => {
    it('should render with default properties', () => {
        render(<Button text="Default Button" />);

        // Перевіряємо текст кнопки
        const buttonElement = screen.getByRole('button', { name: /default button/i });
        expect(buttonElement).toBeInTheDocument();

        // Перевіряємо, чи застосовано стилі за замовчуванням
        expect(buttonElement).toHaveClass('button', 'gray', 'textColor_black', 'fontBold');
        expect(buttonElement).not.toHaveClass('disabled');

        // Перевіряємо тип за замовчуванням
        expect(buttonElement).toHaveAttribute('type', 'submit');
    });

    it('should render with custom properties', () => {
        render(
            <Button
                text="Custom Button"
                bgColor="orange"
                textColor="white"
                isFontBold={false}
                width="200px"
                type="button"
            />
        );

        const buttonElement = screen.getByRole('button', { name: /custom button/i });

        // Перевіряємо стилі
        expect(buttonElement).toHaveClass('button', 'orange', 'textColor_white');
        expect(buttonElement).not.toHaveClass('fontBold');

        // Перевіряємо ширину
        expect(buttonElement).toHaveStyle({ width: '200px' });

        // Перевіряємо тип
        expect(buttonElement).toHaveAttribute('type', 'button');
    });

    it('should render with an icon', () => {
        render(<Button text="Button with Icon" icon={<span data-testid="icon">🔥</span>} />);

        // Перевіряємо наявність тексту
        const buttonElement = screen.getByRole('button', { name: /button with icon/i });
        expect(buttonElement).toBeInTheDocument();

        // Перевіряємо наявність іконки
        const iconElement = screen.getByTestId('icon');
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveTextContent('🔥');
    });

    it('should call onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button text="Clickable Button" onClick={handleClick} />);

        const buttonElement = screen.getByRole('button', { name: /clickable button/i });

        // Викликаємо подію натискання
        fireEvent.click(buttonElement);

        // Перевіряємо, що подія була викликана
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when the disabled prop is true', () => {
        const handleClick = jest.fn();
        render(<Button text="Disabled Button" disabled onClick={handleClick} />);

        const buttonElement = screen.getByRole('button', { name: /disabled button/i });

        // Перевіряємо, що кнопка має клас disabled
        expect(buttonElement).toHaveClass('disabled');

        // Перевіряємо, що кнопка має атрибут disabled
        expect(buttonElement).toBeDisabled();

        // Спроба натиснути на кнопку не викликає подію
        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('should support different button types', () => {
        render(<Button text="Reset Button" type="reset" />);
        const buttonElement = screen.getByRole('button', { name: /reset button/i });

        // Перевіряємо тип кнопки
        expect(buttonElement).toHaveAttribute('type', 'reset');
    });
});
