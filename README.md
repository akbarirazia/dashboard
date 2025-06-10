This is a [Next.js](https://nextjs.org) project that is a simple user dashboard crafted with tailwindcss, typescript, shadcn, react-icons.

## To run the project, first create and env file containing 

```bash
NEXT_PUBLIC_API_KEY={vave}
NEXT_PUBLIC_API_URL={your-api}
```
Or request the owner to give you a copy of the env file

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

## Routes 

- / : Contains the posts (the entery of the project)
- /post/:id : read a specific post
- /admin : contains the admin dashboard
- /admin/edit/:id : edit a post
- /admin/create : create a post 
