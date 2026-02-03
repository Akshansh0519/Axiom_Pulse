import { DefaultSession } from 'next-auth';

/**
 * Type augmentation for NextAuth.js
 * Extends the default session user type with our custom fields
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}