import { createProjectSchema } from '../schemas/createProjectSchema';
import { ZodError } from 'zod';

describe('createProjectSchema', () => {
    it('should pass with valid data', () => {
        const validData = {
            title: 'New Project',
            description: 'This is a description for a new project.',
            deadline: '2024-12-31',
        };

        expect(() => createProjectSchema.parse(validData)).not.toThrow();
    });

    it('should fail if the title is empty', () => {
        const invalidData = {
            title: '',
            description: 'This is a description for a new project.',
            deadline: '2024-12-31',
        };

        expect(() => createProjectSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createProjectSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toBe('Title is required');
            }
        }
    });

    it('should fail if the title exceeds 100 characters', () => {
        const invalidData = {
            title: 'A'.repeat(101),
            description: 'This is a description for a new project.',
            deadline: '2024-12-31',
        };

        expect(() => createProjectSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createProjectSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toBe('Title must be 100 characters or less');
            }
        }
    });

    it('should fail if the description is empty', () => {
        const invalidData = {
            title: 'New Project',
            description: '',
            deadline: '2024-12-31',
        };

        expect(() => createProjectSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createProjectSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toBe('Description is required');
            }
        }
    });

    it('should fail if the description exceeds 500 characters', () => {
        const invalidData = {
            title: 'New Project',
            description: 'A'.repeat(501),
            deadline: '2024-12-31',
        };

        expect(() => createProjectSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createProjectSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toBe('Description must be 500 characters or less');
            }
        }
    });

    it('should fail if the deadline is empty', () => {
        const invalidData = {
            title: 'New Project',
            description: 'This is a description for a new project.',
            deadline: '',
        };

        expect(() => createProjectSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createProjectSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toBe('Deadline is required');
            }
        }
    });

    it('should handle multiple errors at once', () => {
        const invalidData = {
            title: '',
            description: '',
            deadline: '',
        };

        try {
            createProjectSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                const messages = e.errors.map((err) => err.message);
                expect(messages).toContain('Title is required');
                expect(messages).toContain('Description is required');
                expect(messages).toContain('Deadline is required');
            }
        }
    });
});
