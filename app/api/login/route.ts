import { NextResponse } from 'next/server';

import { login } from '@/utils/api/mutations';
import { LoginFormValues } from '@/utils/schemas/loginSchema';
import { setTokens } from '@/utils/serverActions';

export type LoginRequest = LoginFormValues;

export type SignupResponse = {
  success: boolean;
  message: string;
};

export async function POST(req: Request) {
  try {
    const { email, password }: LoginRequest = await req.json();

    const response = await login({ email, password });

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
    return NextResponse.json<SignupResponse>({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
