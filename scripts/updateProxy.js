const { ethers, upgrades } = require('hardhat');

// TO DO: Place the address of your proxy here!
const proxyAddress = '0xE858d56794c4705B23dC7F7cC34801658c5c920A';

/*
  create new contract to update the proxy, and pass it in upgradeProxy and then you have run 
  the code "npx hardhat run scripts/updateProxy.js --network sepolia"
  and then run the code "npx hardhat verify --network sepolia implemented_contract_address."
  and you can it in etherscan once you verify it on etherscan.
*/

async function main() {
  const VendingMachineV2 = await ethers.getContractFactory('VendingMachineV2');
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );

  console.log("The current contract owner is: " + upgraded.owner());
  console.log('Implementation contract address: ' + implementationAddress);
}

main();