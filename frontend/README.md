# EngVision

# Technology used

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [eslint-config-ts-prefixer](https://github.com/laststance/eslint-config-ts-prefixer). Specialized fixable(`--fix` option) rule sets. Zero extend any recommended for confortable DX.
- [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library), [MSW](https://mswjs.io/)
- [tailwindcss](https://tailwindcss.com/)
- [Github Actions](https://github.com/features/actions)

All npm package are keeping least release version powered by [Dependabot](https://github.com/dependabot).

### yarn

```sh
yarn install
yarn validate
yarn dev
```

## Commands

```bash
yarn clean           # remove 'node_modules' 'dist' completely
yarn ci              # clean and install
yarn start           # start development server
yarn dev             # start development server
yarn build           # build production bundle to 'dist' directly
yarn preview         # preview production bundle
yarn lint            # run eslint
yarn lint:fix        # run eslint with --fix option
yarn typecheck       # run TypeScript compiler check
yarn prettier        # run prettier for json|yml|css|md|mdx files
```

## Run via docker

```sh
docker build -t engvision/fe .
```
