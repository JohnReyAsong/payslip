## Directory Structure

The top level directory structure will be as follows:

- components - Global shared/reusable components, such as layout (wrappers, navigation), form components, buttons
- graphql - Ggraphql related files and configurations
- hooks - Custom react-hooks used within the application, also where queries and mutations be found (they are all written as react-hook).
- icons - Application icons, should all be imported on index.ts
- modules - JavaScript modules (all components under specific page should go here, e.g. **modules/dashboard/component.tsx** will contain components rendered in **pages/dashboard.tsx**)
- pages - NextJS page files
- public - Static files (images, logo, local js files)
- store - Global Redux/Zustand store
- theme - Centralized styling of all component / ui elements
- types - Contains auto generated typescript definition for all api queries & mutations
- utils - Utilities & helper functions used within the app

## Path aliasing

Added path aliasing **(@folder-name)** is used to easily determine which files were imported locally and from library, this is very helpful for better organization of imports. Library imports should come first then local.

## Graphql codegen

Running **graphql-codegen** requires you to add **.env** file with `API_URL`'s value as your graphql endpoint. After doing so, you can do `npm run codegen` which will auto generate the typescript definitions for you.

## Environment variables

You must provide **NEXT_PUBLIC_API_URL** environment variable that points to remote graphql server to run the application properly.

## We use this tools

- [ESLint](https://eslint.org/docs/user-guide/configuring/)
- [Husky](https://typicode.github.io/husky/#/)
- [Prettier](https://prettier.io/)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
- [graphql-codegen](https://www.graphql-code-generator.com/)

### [Structure reference](https://www.taniarascia.com/react-architecture-directory-structure)
