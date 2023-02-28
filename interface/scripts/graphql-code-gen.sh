#!/bin/bash
source ../.env

REACT_APP_NETWORK=$REACT_APP_NETWORK yarn graphql-code-generator --config ./src/clients/subgraph/codegen.ts
