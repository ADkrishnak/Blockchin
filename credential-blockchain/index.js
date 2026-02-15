// index.js
require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  // 1️⃣ Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 2️⃣ Check balance
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");

  // 3️⃣ Deploy BlockCert contract
  const BlockCert = await ethers.getContractFactory("BlockCert");
  const blockCert = await BlockCert.deploy();
  await blockCert.deployed();

  console.log("BlockCert deployed to:", blockCert.address);

  // 4️⃣ Example: Issue a certificate (replace with real studentId & hash)
  const tx = await blockCert.issueCertificate(
    "STUDENT123",
    "0x123abc...hash" // SHA256 hash of certificate
  );
  await tx.wait();
  console.log("Certificate issued for STUDENT123");

  // 5️⃣ Example: Verify a certificate
  const isValid = await blockCert.verifyCertificate(
    "STUDENT123",
    "0x123abc...hash"
  );
  console.log("Verification result:", isValid);
}

// Execute main and catch errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
