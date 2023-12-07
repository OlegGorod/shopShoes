import {NextApiRequest, NextApiResponse} from 'next';
import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {IError} from '@/types/api/error';

import {authAPI} from '@/api/auth';
import {userAPI} from '@/api/user';
import {IResponseData} from '@/types/api/response';
import {IAuthUser} from '@/types/auth/user';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-in',
  },

  session: {strategy: 'jwt'},

  providers: [
    CredentialsProvider({
      credentials: {
        email: {label: 'email', type: 'email', required: true},
        password: {label: 'password', type: 'password', required: true},
      },

      type: 'credentials',

      async authorize({email, password}: any) {
        try {
          const {data} = await authAPI.signIn({
            email: email,
            password: password,
          });

          const avatar = await userAPI.getAvatar((data as IResponseData).jwt);

          return {
            id: `${(data as IResponseData).user.id}`,
            email: (data as IResponseData).user.email,
            name: (data as IResponseData).user.username,
            phoneNumber: (data as IResponseData).user.phoneNumber,
            avatar,
            jwt: (data as IResponseData).jwt,
          };
        } catch (e) {
          throw Error((e as IError).error.message);
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({token, user, trigger, session}) => {
      if (trigger === 'update' && session?.email) {
        const avatar = await userAPI.getAvatar(token.jwt as string);
        return {
          ...token,
          name: session.username,
          email: session.email,
          phoneNumber: session.phoneNumber,
          avatar: avatar,
          jwt: token.jwt,
        };
      }

      if (user) {
        return {
          ...token,
          phoneNumber: user.phoneNumber,
          avatar: user.avatar,
          jwt: user.jwt,
        };
      }
      return token;
    },

    session: async ({session, token}: any) => {
      if (session.user) {
        (session.user as IAuthUser).id = +token.sub;
        (session.user as IAuthUser).phoneNumber = token.phoneNumber;
        (session.user as IAuthUser).avatar = token.avatar;
        session.jwt = token.jwt;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
