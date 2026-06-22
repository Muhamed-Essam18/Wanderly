# Wanderly — Travel Decision App

Wanderly is a Next.js-based travel decision assistant that helps users explore cities and places, with authentication, city data APIs, and a responsive UI built with Tailwind and React.

**Status:** Early development

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, MongoDB, Mongoose, JWT auth

**Links:**
- **Repository:** https://github.com/Muhamed-Essam18/Wanderly
- **Live Demo:** https://wanderly-two.vercel.app/

## Screenshots

![Home Page](./readme/Home%20Page.png)
![Countries Recommendations](./readme/Countries%20Recommendations.png)
![Country Details](./readme/Country%20details.png)
![Places Fetch](./readme/Places%20fetch.png)
![Mobile View](./readme/Mobile%20view.png)

**Table of contents**

- **Project:** Overview and goals
- **Quick Start:** install and run locally
- **Environment:** required env vars
- **API:** important endpoints and examples
- **Folder layout:** where to find key code
- **Scripts:** useful npm scripts
- **Deployment:** recommended steps
- **Contributing & License:** how to help

**Project**

Wanderly is a small travel app prototype that: finds cities and places, lets users create accounts, and uses JWT-based auth for protected API routes. The app is organized as a Next.js app director[...]

**Quick Start (local)**

1. Install dependencies:

```bash
npm install
```

2. Add environment variables (see next section) in a `.env.local` file at the project root.

3. Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

**Environment**

Create a `.env.local` file and set the following values:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/dbname
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
NODE_ENV=development
```

- `MONGODB_URI`: connection string used by [lib/mongodb.ts](lib/mongodb.ts)
- `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`: used by [lib/auth.ts](lib/auth.ts) to sign JWTs

Keep secrets out of source control and rotate them for production.

**API (important routes)**

Authentication endpoints (JSON request bodies unless noted):

- `POST /api/auth/register` — register a new user. Body: `{ email, password, confirmPassword }` — returns `accessToken` and sets `accessToken`/`refreshToken` cookies. See [app/api/auth/registe[...]
- `POST /api/auth/login` — login. Body: `{ email, password }` — returns `accessToken` and sets cookies. See [app/api/auth/login/route.ts](app/api/auth/login/route.ts).
- `POST /api/auth/refresh` — refresh access token using `refreshToken` cookie. See [app/api/auth/refresh/route.ts](app/api/auth/refresh/route.ts).
- `POST /api/auth/logout` — clears auth cookies. See [app/api/auth/logout/route.ts](app/api/auth/logout/route.ts).
- `GET /api/auth/profile` — protected route returning the current user (requires cookie or `Authorization: Bearer <token>`). See [app/api/auth/profile/route.ts](app/api/auth/profile/route.ts).

City data endpoints:

- `GET /api/cities` — (see [app/api/cities/route.ts](app/api/cities/route.ts)).
- `GET /api/cities/image` — image helper route at [app/api/cities/image/route.ts](app/api/cities/image/route.ts).

Example curl (login):

```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"user@example.com","password":"secret"}'
```

Note: the server sets `accessToken` and `refreshToken` as HTTP-only cookies; include them in subsequent browser requests.

**Folder layout (key files)**

- [app/](app/) — Next.js app routes and pages (UI and API routes)
- [app/api/](app/api/) — server routes (auth, cities, tests)
- [app/models/User.ts](app/models/User.ts) — Mongoose user model
- [Components/](Components/) — React UI components (Navbar, City, Modal, etc.)
- [lib/](lib/) — helpers: `mongodb.ts`, `auth.ts`, `password.ts`, `middleware-auth.ts`
- [public/imgs/](public/imgs/) — static images

**Scripts**

- `npm run dev` — start Next.js dev server
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run lint` — run ESLint

These are defined in [package.json](package.json).

**Testing & Linting**

There are no automated tests included. Use the `lint` script to check code quality via ESLint.

**Deployment**

Deploy to Vercel for easiest integration with Next.js. Configure the same env vars in the Vercel dashboard (`MONGODB_URI`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`). If using a different hos[...]

**Security notes**

- Keep JWT secrets and DB credentials out of source control.
- Use HTTPS in production so cookies with `secure` flag are transmitted safely.
- Consider rotating refresh tokens and storing them server-side for increased security.

**Contributing**

1. Fork the repo and create a feature branch.
2. Open a pull request describing the change.
