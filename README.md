# Campus Mobile + Web

An Expo, React Native, and TypeScript campus operations prototype for iOS, Android, and web. NativeWind provides Tailwind-style classes across platforms.

## Run

```sh
npm install
npm start
```

Use the Expo terminal shortcuts to open Android, iOS, or web. For web only, run `npm run web`. Run `npm run typecheck` to check TypeScript.

## App structure

- `src/context/AppContext.tsx` provides the signed-in user, persisted demo role, session actions, and the app/web presentation switcher through `useAppContext()`.
- `app/` contains Expo Router routes. The root route redirects to `/sign-in` or `/dashboard` according to the persisted session.
- `src/components/` contains role-aware Admin, HOD, Faculty, and Student workspaces, including attendance, exams/results, courses, fees, library, classes, departments, and reports views.
- `src/common/global/` contains the shared back button, notice/toast provider, and loader. Call `showNotice({ type, message, mode, position })` from `useFeedback()` for global feedback.
- `src/i18n/locales/en.json` and `hi.json` contain the English and Hindi message dictionaries. Use `useTranslation()` and switch the language from the shared top bar.
- `src/constants/` contains the color, font-family, text-size, and role-to-module maps.
- `App.tsx` starts Expo Router.
- `global.css`, `tailwind.config.js`, `babel.config.js`, and `metro.config.js` configure NativeWind.

The role picker, campus data, attendance edits, and action feedback are demo behavior backed by local state and AsyncStorage. Connect authentication and school records to a backend before using real accounts; production roles and permissions must be assigned and validated server-side.