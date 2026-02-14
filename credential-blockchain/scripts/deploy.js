const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const BlockCertFactory = await hre.ethers.getContractFactory("BlockCert");
  const blockCert = await BlockCertFactory.deploy();
  await blockCert.waitForDeployment(); // ethers v6

  console.log("BlockCert deployed to:", await blockCert.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

