# Essentials Web3 Monorepo

Barebones web3 monorepo. The philosophy behind this template is to include best practices such as strong test and development setup with the minimal amount of features. This means less mucking through random code, deleting and cleaning it up and faster building 💪

#### Includes
- Solidity dev environment with `hardhat` and `hardhat-deploy`
- Rust server using `actix` and `ethers-rs`
- React frontend with `wagmi`
- Subgraph

## 🏁 Get started
All dependencies are managed by yarn except for the server which is in rust and uses cargo

All the services are orchestrated using a docker compose so they can be brought up together or separately. The `app` profile brings up the entire stack.

#### Profiles
- `subgraph`
- `protocol`
- `interface`
- `server`

```bash
docker-compose --profile app up
```

Dev dependencies for linting the project and keeping things in order need to be installed separately on the local machine.

## 🗺 Roadmap

### Interface
Basic Create React App with integrations for interacting with smart contracts and subgraph

- [x] Subgraph integration
- [x] Web3 integration
- [ ] Unit tests
- [ ] Integration/ e2e tests

### Protocol
Basic smart contract setup
- [x] Basic Contract
- [x] Unit tests
- [x] Deploy script
- [ ] Docgen
- [ ] Integration tests

### Subgraph
This subgraph is setup to index the current protocol contract events.
- [x] Basic Subgraph
- [x] Unit tests
- [ ] Integration tests

### Server
At the time of publishing this is all the Rust code I've written. Its a strech goal to build the server in rust.
- [x] Basic Endpoints
- [x] Unit tests
- [ ] ethers-rs (in progress)

### CI
- [x] Linting
- [ ] Tests w/ PR coverage
- [ ] Slyther for smart contracts
- [ ] Semantic versioning
- [ ] Commit / PR linting
- [ ] Make file for managing build process
