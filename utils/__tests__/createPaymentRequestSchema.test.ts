import { createPaymentRequestSchema } from '../schemas/createPaymentRequestSchema';

describe('createPaymentRequestSchema', () => {
    it('should validate a correct payment request object', () => {
        const validInput = {
            usdAmount: '100',
            comment: 'Payment for services rendered',
            startDate: '2024-01-01',
            endDate: '2024-01-31',
        };

        expect(() => createPaymentRequestSchema.parse(validInput)).not.toThrow();
    });

    it('should reject if usdAmount is empty', () => {
        const invalidInput = {
            usdAmount: '',
            comment: 'Payment for services rendered',
            startDate: '2024-01-01',
            endDate: '2024-01-31',
        };

        expect(() => createPaymentRequestSchema.parse(invalidInput)).toThrowError('Invalid number');
    });

    it('should reject if usdAmount is not a number', () => {
        const invalidInput = {
            usdAmount: 'abc',
            comment: 'Payment for services rendered',
            startDate: '2024-01-01',
            endDate: '2024-01-31',
        };

        expect(() => createPaymentRequestSchema.parse(invalidInput)).toThrowError('Invalid number');
    });

    it('should reject if comment is empty', () => {
        const invalidInput = {
            usdAmount: '100',
            comment: '',
            startDate: '2024-01-01',
            endDate: '2024-01-31',
        };

        expect(() => createPaymentRequestSchema.parse(invalidInput)).toThrowError('Comment is required');
    });

    it('should validate if startDate and endDate are correctly provided', () => {
        const validInput = {
            usdAmount: '200',
            comment: 'Invoice payment',
            startDate: '2024-03-01',
            endDate: '2024-03-31',
        };

        expect(() => createPaymentRequestSchema.parse(validInput)).not.toThrow();
    });

    it('should accept startDate and endDate even as invalid date formats (zod validation does not validate date formatting)', () => {
        const invalidDateFormatInput = {
            usdAmount: '200',
            comment: 'Invoice payment',
            startDate: 'invalid-date',
            endDate: 'another-invalid-date',
        };
        
        expect(() => createPaymentRequestSchema.parse(invalidDateFormatInput)).not.toThrow();
    });
});
