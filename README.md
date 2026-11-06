# NOVA Mobile + Web

An Expo, React Native, and TypeScript starter for building iOS, Android, and web apps from one shared codebase. NativeWind provides Tailwind-style classes across platforms.

## Run

```sh
npm install
npm start
```

Use the Expo terminal shortcuts to open Android, iOS, or web. For web only, run `npm run web`. Run `npm run typecheck` to check TypeScript.

## App structure

- `src/context/AppContext.tsx` provides the signed-in user, persisted session actions, and the app/web presentation switcher through `useAppContext()`.
- `src/constants/` contains the color, font-family, and text-size tokens.
- `App.tsx` contains the sign-in and NOVA dashboard screens.
- `global.css`, `tailwind.config.js`, `babel.config.js`, and `metro.config.js` configure NativeWind.

The email sign-in is a local demo flow backed by AsyncStorage. Connect `signIn` and `signOut` in `AppContext.tsx` to an authentication service before using real accounts.