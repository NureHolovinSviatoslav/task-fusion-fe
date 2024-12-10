import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../common/Input';
import { IoSearchOutline } from 'react-icons/io5';

describe('Input Component', () => {
    it('should render an input field by default', () => {
        render(<Input />);

        // Check if the input element is rendered
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });

    it('should render a textarea when multiline is true', () => {
        render(<Input multiline />);

        // Check if the textarea element is rendered
        const textareaElement = screen.getByRole('textbox');
        expect(textareaElement).toBeInTheDocument();
        expect(textareaElement.tagName).toBe('TEXTAREA');
    });

    it('should handle input changes correctly', () => {
        const handleChange = jest.fn();
        render(<Input value="" onChange={handleChange} />);

        const inputElement = screen.getByRole('textbox');

        // Simulate typing into the input field
        fireEvent.change(inputElement, { target: { value: 'Test Input' } });

        expect(handleChange).toHaveBeenCalled();
    });

    it('should handle textarea changes correctly', () => {
        const handleChange = jest.fn();
        render(<Input value="" onChange={handleChange} multiline />);

        const textareaElement = screen.getByRole('textbox');

        // Simulate typing into the textarea field
        fireEvent.change(textareaElement, { target: { value: 'Test Textarea' } });

        expect(handleChange).toHaveBeenCalled();
    });

    it('should apply correct styles for search input', () => {
        render(<Input isSearch />);

        // Check if the padding-left is applied when isSearch is true
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveStyle('padding-left: 2.5rem');
    });

    it('should apply correct styles for regular input', () => {
        render(<Input />);

        // Check if the padding-left is applied when isSearch is false
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveStyle('padding-left: 1.5rem');
    });
});
