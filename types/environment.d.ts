import 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NEXT_API_URL: string;
      NEXT_PUBLIC_EXTERNAL_API_URL: string;
      AT_SECRET: string;
      RT_SECRET: string;
    }
  }
}
