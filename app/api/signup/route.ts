import { NextResponse } from 'next/server';

import { createUser } from '@/utils/api/mutations';
import { SignupFormValues } from '@/utils/schemas/signupSchema';
import { setTokens } from '@/utils/serverActions';

export type SignupRequest = SignupFormValues;

export type SignupResponse = {
  success: boolean;
  message: string;
  error?: unknown;
};

export async function POST(req: Request) {
  try {
    const requestData: SignupRequest = await req.json();

    const response = await createUser(requestData);

    if (!response.data || !response.data.accessToken || !response.data.refreshToken) {
      return NextResponse.json<SignupResponse>({ success: false, message: 'An error occurred' }, { status: 500 });
    }

    await setTokens(response.data.accessToken, response.data.refreshToken);

    return NextResponse.json<SignupResponse>(
      {
        success: true,
        message: 'Data processed successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json<SignupResponse>({ success: false, message: 'An error occurred', error }, { status: 500 });
  }
}
