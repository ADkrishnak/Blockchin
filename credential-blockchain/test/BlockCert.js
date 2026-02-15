const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BlockCert", function () {
  let blockCert;
  let owner;
  let addr1;

  beforeEach(async function () {
    const BlockCert = await ethers.getContractFactory("BlockCert");
    [owner, addr1] = await ethers.getSigners();
    blockCert = await BlockCert.deploy();
    await blockCert.waitForDeployment();
  });

  describe("Issue Certificate", function () {
    it("Should issue a certificate", async function () {
      const tx = await blockCert.issueCertificate("STU001", "hash123");
      await tx.wait();

      const cert = await blockCert.getCertificate("STU001");
      expect(cert[0]).to.equal("hash123");
      expect(cert[2]).to.equal(false); // not revoked
    });
  });

  describe("Verify Certificate", function () {
    it("Should verify a valid certificate", async function () {
      await blockCert.issueCertificate("STU002", "hash456");
      const isValid = await blockCert.verifyCertificate("STU002", "hash456");
      expect(isValid).to.equal(true);
    });

    it("Should reject invalid certificate", async function () {
      await blockCert.issueCertificate("STU003", "hash789");
      const isValid = await blockCert.verifyCertificate("STU003", "wronghash");
      expect(isValid).to.equal(false);
    });
  });

  describe("Revoke Certificate", function () {
    it("Should revoke a certificate", async function () {
      await blockCert.issueCertificate("STU004", "hash101");
      
      const tx = await blockCert.revokeCertificate("STU004");
      await tx.wait();

      const cert = await blockCert.getCertificate("STU004");
      expect(cert[2]).to.equal(true); // revoked
    });

    it("Should fail verification for revoked certificate", async function () {
      await blockCert.issueCertificate("STU005", "hash202");
      await blockCert.revokeCertificate("STU005");
      
      const isValid = await blockCert.verifyCertificate("STU005", "hash202");
      expect(isValid).to.equal(false);
    });
  });
});
