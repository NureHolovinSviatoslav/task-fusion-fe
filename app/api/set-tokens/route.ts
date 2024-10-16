import { NextResponse } from 'next/server';

import { setTokens } from '@/utils/serverActions';

export type SetTokensRequest = {
  accessToken: string;
  refreshToken: string;
};

export type Response = {
  success: boolean;
  message: string;
};

export async function POST(req: Request) {
  try {
    const { accessToken, refreshToken }: SetTokensRequest = await req.json();

    await setTokens(accessToken, refreshToken);

    return NextResponse.json<Response>({ success: true, message: 'Data processed successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json<Response>({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
