use crate::{
  contracts::{Address, Chain}
};

use ethers::{
    contract::abigen,
    core::{
        types::{Address, U256},
        utils::Anvil,
    },
    middleware::SignerMiddleware,
    providers::{Http, Provider},
    signers::LocalWallet,
};

abigen!(
    VerifierContract,
    "../../../protocol/artifacts/contracts/Gravatar.sol/GravatarRegistry.json"
);

async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let anvil = Anvil::new().spawn();
    let provider =
        Provider::<Http>::try_from(anvil.endpoint())?.interval(Duration::from_millis(10u64));
    let wallet: LocalWallet = anvil.keys()[0].clone().into();

    let client = SignerMiddleware::new(provider, wallet);
    let client = Arc::new(client);

    let contract = VerifierContract::new(Address::zero(), client);

    return contract;
}
