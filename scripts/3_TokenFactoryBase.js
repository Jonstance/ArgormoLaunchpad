// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const TokenFactoryBase = await hre.ethers.getContractFactory("TokenFactoryBase");
  const _tokenFactoryBase = await TokenFactoryBase.deploy("0xCC228444087e7eecC9474a1e45ae8a2A4f0B7171", "0xA3EB3Dc016e7312a2cd2f6bbeBAe2c0b4B1F2313");

  await _tokenFactoryBase.deployed();

  console.log("TokenFactoryBase deployed to:", _tokenFactoryBase.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
