import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessTokenExpires?: string;
    jwt?: string;
    user?: User;
  }

  interface User {
    id: string;
    email?: string;
    username?: string;
    phoneNumber?: string | null;
    avatar?: string | null;
    jwt?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessTokenExpires?: number;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
