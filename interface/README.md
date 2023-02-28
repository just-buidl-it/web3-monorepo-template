# dApp Interface

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Subgraph
The subgraph integration uses generated typed queries for type safe graphQL requests. Those can be run `yarn graphql-codegen`.
It requires a subgraph deployment to create the queries against. 
```
yarn workspace subgraph run create:local
yarn workspace subgraph run deploy:local
yarn workspace interface run graphql-codegen
```

## Protocol
Basic web3 integration is provided through `wagmi`.
