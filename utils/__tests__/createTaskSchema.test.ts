import { createTaskSchema } from '../schemas/createTaskSchema';
import { TaskPriority, TaskStatus } from '@/types/enums';
import { ZodError } from 'zod';

describe('createTaskSchema', () => {
    it('should pass with valid data', () => {
        const validData = {
            title: 'New Task',
            description: 'This is a description for the new task.',
            taskPriority: TaskPriority.HIGH,
            taskStatus: TaskStatus.TO_DO,
            deadline: '2024-12-31',
        };

        expect(() => createTaskSchema.parse(validData)).not.toThrow();
    });

    it('should fail if the title is empty', () => {
        const invalidData = {
            title: '',
            description: 'This is a description for the new task.',
            taskPriority: TaskPriority.HIGH,
            taskStatus: TaskStatus.TO_DO,
            deadline: '2024-12-31',
        };

        expect(() => createTaskSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createTaskSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toBe('Title is required');
            }
        }
    });

    it('should fail if the description is empty', () => {
        const invalidData = {
            title: 'New Task',
            description: '',
            taskPriority: TaskPriority.HIGH,
            taskStatus: TaskStatus.TO_DO,
            deadline: '2024-12-31',
        };

        expect(() => createTaskSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createTaskSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toBe('Description is required');
            }
        }
    });

    it('should fail if taskPriority is not a valid enum value', () => {
        const invalidData = {
            title: 'New Task',
            description: 'This is a description for the new task.',
            taskPriority: 'INVALID_PRIORITY',
            taskStatus: TaskStatus.TO_DO,
            deadline: '2024-12-31',
        };

        expect(() => createTaskSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createTaskSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toContain('Invalid enum value');
            }
        }
    });

    it('should fail if taskStatus is not a valid enum value', () => {
        const invalidData = {
            title: 'New Task',
            description: 'This is a description for the new task.',
            taskPriority: TaskPriority.HIGH,
            taskStatus: 'INVALID_STATUS',
            deadline: '2024-12-31',
        };

        expect(() => createTaskSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createTaskSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toContain('Invalid enum value');
            }
        }
    });

    it('should fail if the deadline is empty', () => {
        const invalidData = {
            title: 'New Task',
            description: 'This is a description for the new task.',
            taskPriority: TaskPriority.HIGH,
            taskStatus: TaskStatus.TO_DO,
            deadline: '',
        };

        expect(() => createTaskSchema.parse(invalidData)).toThrow(ZodError);
        try {
            createTaskSchema.parse(invalidData);
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
            taskPriority: 'INVALID_PRIORITY',
            taskStatus: 'INVALID_STATUS',
            deadline: '',
        };

        try {
            createTaskSchema.parse(invalidData);
        } catch (e) {
            if (e instanceof ZodError) {
                const messages = e.errors.map((err) => err.message);
                expect(messages).toContain('Title is required');
                expect(messages).toContain('Description is required');
            }
        }
    });
});
