import { describe, it, expect } from '@jest/globals';
import { addHours, format } from 'date-fns';

import { Task, Action, PaymentRequestWithProject } from '@/types';
import { TaskPriority, TaskStatus, UserType, PaymentRequestStatus } from '@/types/enums';

import {
  mapTasksToColumns,
  mapActionsToColumns,
  mapPaymentRequestsToListItems,
  capitalizeFirstLetter,
  formatDate,
  mapPathnameToLocationArray,
} from '../helpers';

describe('Helper functions', () => {
  describe('mapTasksToColumns', () => {
    it('should map tasks to column items', () => {
      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'Test Task',
          description: '',
          taskPriority: TaskPriority.HIGH,
          taskStatus: TaskStatus.TO_DO,
          projectId: 123,
          developerId: 1,
          deadline: new Date('2024-02-01'),
          users: [
            {
              id: 1,
              email: 'john@example.com',
              name: 'John Doe',
              description: '',
              userType: UserType.DEVELOPER,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      const result = mapTasksToColumns(mockTasks);

      expect(result[0]).toEqual({
        id: 1, // Changed from '1' to 1
        title: 'Test Task',
        rows: [
          {
            name: 'Participants',
            value: 'John Doe',
          },
          {
            name: 'Date added',
            value: expect.any(String),
          },
        ],
        priority: TaskPriority.HIGH,
        href: '/projects/123/task/1',
      });
    });
  });

  describe('mapActionsToColumns', () => {
    it('should map actions to columns', () => {
      const mockActions: Action[] = [
        {
          id: 1,
          title: 'Test Action',
          taskId: 1,
          userId: 1,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          user: {
            id: 1,
            email: 'john@example.com',
            name: 'John Doe',
            description: '',
            userType: UserType.DEVELOPER,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];

      const result = mapActionsToColumns(mockActions);

      expect(result[0]).toEqual({
        id: 1, // Changed from '1' to 1
        title: 'Test Action',
        rows: [
          {
            name: 'Date added',
            value: expect.any(String),
          },
        ],
        author: expect.any(Object),
      });
    });
  });

  describe('mapPaymentRequestsToListItems', () => {
    it('should map payment requests to list items', () => {
      const mockRequests: PaymentRequestWithProject[] = [
        {
          id: 1,
          projectId: 123,
          clientUserId: 1,
          comment: '',
          usdAmount: 100,
          paymentPeriodStartDate: '2024-01-01',
          paymentPeriodEndDate: '2024-02-01',
          status: PaymentRequestStatus.PENDING,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
          project: {
            id: 123,
            title: 'Test Project',
            description: '',
            deadline: new Date('2024-02-01'),
            clientUserId: 1,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
          },
        },
      ];

      const result = mapPaymentRequestsToListItems(mockRequests);

      expect(result[0].title).toBe('Payment Request for Test Project');
      expect(result[0].right).toBe(123); // Changed from '123' to 123
      expect(result[0].href).toBe('projects/123/payment-request/1');
    });
  });

  describe('mapPathnameToLocationArray', () => {
    it('should handle empty path', () => {
      expect(mapPathnameToLocationArray('')).toEqual([]);
    });

    it('should handle root path', () => {
      expect(mapPathnameToLocationArray('/')).toEqual([]);
    });

    it('should handle simple path', () => {
      expect(mapPathnameToLocationArray('/projects')).toEqual(['Projects']);
    });

    it('should handle nested path', () => {
      expect(mapPathnameToLocationArray('/projects/123/tasks')).toEqual(['Projects', '123', 'Tasks']);
    });

    it('should handle deep nested path', () => {
      expect(mapPathnameToLocationArray('/projects/123/tasks/456/edit')).toEqual([
        'Projects',
        '123',
        'Tasks',
        '456',
        'Edit',
      ]);
    });

    it('should handle trailing slash', () => {
      expect(mapPathnameToLocationArray('/projects/')).toEqual(['Projects']);
    });

    it('should handle multiple consecutive slashes', () => {
      expect(mapPathnameToLocationArray('/projects///123//tasks/')).toEqual(['Projects', '123', 'Tasks']);
    });

    it('should handle path with special characters', () => {
      expect(mapPathnameToLocationArray('/projects/test-project/tasks')).toEqual(['Projects', 'Test-project', 'Tasks']);
    });

    it('should handle path with numbers', () => {
      expect(mapPathnameToLocationArray('/projects/123/task/456')).toEqual(['Projects', '123', 'Task', '456']);
    });

    it('should handle path with query parameters', () => {
      expect(mapPathnameToLocationArray('/projects?status=active')).toEqual(['Projects?status=active']);
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter of a word', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should handle single letter', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
    });

    it('should handle already capitalized word', () => {
      expect(capitalizeFirstLetter('Hello')).toBe('Hello');
    });

    it('should handle string with numbers', () => {
      expect(capitalizeFirstLetter('123test')).toBe('123test');
    });

    it('should handle string with special characters', () => {
      expect(capitalizeFirstLetter('@test')).toBe('@test');
    });

    it('should handle multiple words', () => {
      expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
    });

    it('should handle string with spaces at start', () => {
      expect(capitalizeFirstLetter(' hello')).toBe(' hello');
    });

    it('should handle all caps', () => {
      expect(capitalizeFirstLetter('HELLO')).toBe('HELLO');
    });

    it('should handle mixed case', () => {
      expect(capitalizeFirstLetter('hELLo')).toBe('HELLo');
    });
  });

  describe('formatDate', () => {
    it('should format Date object correctly', () => {
      const date = new Date('2024-03-25T10:30:00');
      const expected = format(addHours(date, 2), 'MM/dd/yyyy, h:mm a');

      expect(formatDate(date)).toBe(expected);
    });

    it('should format date string correctly', () => {
      const dateStr = '2024-03-25T10:30:00';
      const date = new Date(dateStr);
      const expected = format(addHours(date, 2), 'MM/dd/yyyy, h:mm a');

      expect(formatDate(dateStr)).toBe(expected);
    });

    it('should handle ISO date string', () => {
      const isoDate = '2024-03-25T10:30:00.000Z';
      const date = new Date(isoDate);
      const expected = format(addHours(date, 2), 'MM/dd/yyyy, h:mm a');

      expect(formatDate(isoDate)).toBe(expected);
    });

    it('should handle date with different time zones', () => {
      const dates = ['2024-03-25T10:30:00+00:00', '2024-03-25T10:30:00-05:00', '2024-03-25T10:30:00+05:00'];

      dates.forEach((dateStr) => {
        const date = new Date(dateStr);
        const expected = format(addHours(date, 2), 'MM/dd/yyyy, h:mm a');

        expect(formatDate(dateStr)).toBe(expected);
      });
    });

    it('should handle dates at different times of day', () => {
      const times = [
        '2024-03-25T00:00:00', // midnight
        '2024-03-25T12:00:00', // noon
        '2024-03-25T23:59:59', // end of day
      ];

      times.forEach((timeStr) => {
        const date = new Date(timeStr);
        const expected = format(addHours(date, 2), 'MM/dd/yyyy, h:mm a');

        expect(formatDate(timeStr)).toBe(expected);
      });
    });

    it('should handle dates across month boundaries', () => {
      const date = new Date('2024-03-31T23:00:00');
      const expected = format(addHours(date, 2), 'MM/dd/yyyy, h:mm a');

      expect(formatDate(date)).toBe(expected);
    });

    it('should handle dates across year boundaries', () => {
      const date = new Date('2024-12-31T23:00:00');
      const expected = format(addHours(date, 2), 'MM/dd/yyyy, h:mm a');

      expect(formatDate(date)).toBe(expected);
    });

    it('should handle leap year dates', () => {
      const date = new Date('2024-02-29T10:30:00');
      const expected = format(addHours(date, 2), 'MM/dd/yyyy, h:mm a');

      expect(formatDate(date)).toBe(expected);
    });

    it('should handle daylight saving time transitions', () => {
      // DST start (spring forward)
      const dstStart = new Date('2024-03-10T01:59:59');

      expect(formatDate(dstStart)).toBe(format(addHours(dstStart, 2), 'MM/dd/yyyy, h:mm a'));

      // DST end (fall back)
      const dstEnd = new Date('2024-11-03T01:59:59');

      expect(formatDate(dstEnd)).toBe(format(addHours(dstEnd, 2), 'MM/dd/yyyy, h:mm a'));
    });

    it('should handle invalid date strings', () => {
      expect(() => formatDate('invalid-date')).toThrow();
    });
  });
});
