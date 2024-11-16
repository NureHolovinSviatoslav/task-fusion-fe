import { invitePmSchema } from '../schemas/invitePmSchema';
import { checkPmEmail } from '@/utils/api/queries';

jest.mock('@/utils/api/queries', () => ({
    checkPmEmail: jest.fn(),
}));

describe('invitePmSchema', () => {
    it('should accept a valid email with an existing PM', async () => {
        (checkPmEmail as jest.Mock).mockResolvedValue(true);

        const result = await invitePmSchema.safeParseAsync({
            email: 'pm@example.com',
        });

        expect(result.success).toBe(true);
    });

    it('should reject an invalid email format', async () => {
        const result = await invitePmSchema.safeParseAsync({
            email: 'invalid-email',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe('Invalid email address');
    });

    it('should reject a non-existing PM email', async () => {
        (checkPmEmail as jest.Mock).mockRejectedValue(new Error('PM not found'));

        const result = await invitePmSchema.safeParseAsync({
            email: 'nonexistentpm@example.com',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe('PM does not exist');
    });

    it('should reject empty email', async () => {
        const result = await invitePmSchema.safeParseAsync({
            email: '',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe('Invalid email address');
    });

    it('should reject if checkPmEmail throws a generic error', async () => {
        (checkPmEmail as jest.Mock).mockRejectedValue(new Error('Some other error'));

        const result = await invitePmSchema.safeParseAsync({
            email: 'pm@example.com',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe('PM does not exist');
    });
});
