export {default} from 'next-auth/middleware';

export const config = {
  matcher: ['/profile/my-products', '/profile/settings', '/product/add'],
};
