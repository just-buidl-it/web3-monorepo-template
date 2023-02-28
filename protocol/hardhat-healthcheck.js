#!/usr/bin/env node
const ethers = require('ethers');

/**
 * If node is up this function will silently succeed. If the node is down it will throw an error.
 */
async function healthCheck() {
  const localProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  await localProvider.getBlockNumber();
}

module.exports = healthCheck();
