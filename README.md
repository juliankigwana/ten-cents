# Getting Started

You need a [token](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql) to access the Github GraphQL endpoint.
Once generated the token needs to be placed in the `.env` at the project directory.\
`REACT_APP_AUTH_TOKEN=<your token>`

## Available Scripts

In the project directory, you can run:

`yarn install` to download the dependancies\
`yarn start` to start the app. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

`yarn api:generate` to generate a new GraphQL client by scanning for \*.graphql documents.

`yarn test` launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`yarn build` builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Technologies used

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- TypeScript
- Material UI
- URQL GraphQL client
- GraphQL Code Generator
- Jest / React Testing Library

## To do

- I bolted the sorting code on the end, it needs tidying up.
- The functionality currently in the `DataTableContainer` would be pulled out into its own `useDataTable` hook and pass the props directly from the hook to the container. This way I would still be be able to keep the (updated) `DataTableContainer.test`, but I would add a further `useDataTable.test` and test all the pagination and filtering within the hook.
- Tests are needed to cover all the other components.
