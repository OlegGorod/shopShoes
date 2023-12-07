## Notes

### styles

To use tailwind classes add tw- prefix e.g. tw-p-5

### folder structure

Create page related components inside /src/components/[page_name].
You can store general ui related components inside /src/components/UI

### env

Inside project we use environment variables, so add them to your local .env.local file

```bash
NEXTAUTH_SECRET="SECRET"
NEXT_PUBLIC_DOMAIN_URL="http://localhost:3000"
NEXT_PUBLIC_URL="https://shoes-shop-strapi.herokuapp.com/api"
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## NPM Scripts

- `dev`: Start the development server using Next.js.
- `build`: Build the project using Next.js.
- `start`: Start the production server using Next.js.
- `lint`: Run linting checks on your code using Next.js's linting tools.
- `prepare`: Install Husky pre-commit and pre-push hooks to ensure code quality checks are enforced.
- `check-types`: Check TypeScript types using the TypeScript compiler (tsc).
- `check-format`: Check code formatting using Prettier to ensure code consistency.
- `check-lint`: Run ESLint on TypeScript (.ts and .tsx) and JavaScript (.js) files for code quality checks.
- `format`: Automatically format your code using Prettier.
- `test-format`: Run a combination of checks, including code formatting, linting, TypeScript type checking, and project building.

These scripts are designed to streamline the development and code quality assurance process for your Next.js project. You can execute them using the `npm run` command followed by the script name, such as `npm run dev` to start the development server.

## DOCs

Links to docs of libraries we are using:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Explore Tailwind CSS documentation for utility classes and styling.
- [Material-UI (MUI) Documentation](https://mui.com/getting-started/usage/) - Discover Material-UI documentation for UI components.
- [React Query Documentation](https://react-query.tanstack.com/) - Find information on using React Query for data fetching and state management in React applications.
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction) - Learn about NextAuth.js for authentication and authorization in Next.js applications.
- [Formik Documentation](https://formik.org/docs/overview) - Explore Formik documentation for building forms in React with ease.
- [Yup Documentation](https://github.com/jquense/yup) - Access Yup documentation for schema validation in form handling.

## Useful Links

- [Trello Board](https://trello.com/b/CVyhcx3O/team-2)
