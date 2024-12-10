import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonWithModal } from '../common/ButtonWithModal';

describe('ButtonWithModal Component', () => {
    it('renders the button with the correct title', () => {
        render(<ButtonWithModal title="Open Modal">Modal Content</ButtonWithModal>);

        const button = screen.getByRole('button', { name: /open modal/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Open Modal');
    });

    it('handles custom children content inside the modal', () => {
        render(
            <ButtonWithModal title="Open Modal">
                <div>
                    <p>Custom Content</p>
                    <button>Extra Button</button>
                </div>
            </ButtonWithModal>
        );

        // Відкриваємо модальне вікно
        fireEvent.click(screen.getByRole('button', { name: /open modal/i }));

        // Перевіряємо користувацький контент
        expect(screen.getByText('Custom Content')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /extra button/i })).toBeInTheDocument();
    });
});
