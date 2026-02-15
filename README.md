BlockCert

Blockchain-Based Academic Credential Verification System

Overview

BlockCert is a decentralized application (DApp) that enables secure issuance and verification of academic certificates using blockchain technology.

Instead of relying on manual verification or centralized databases, certificate authenticity is validated through cryptographic hashing and immutable smart contracts deployed on Ethereum.

This eliminates certificate forgery, reduces verification time, and ensures tamper-proof record storage.

Problem

Academic credential fraud is increasing globally. Traditional verification methods:

Require manual checks

Take days or weeks

Depend on centralized databases

Are vulnerable to tampering

BlockCert solves this by storing cryptographic proofs of certificates on-chain.

Solution

The institution uploads a certificate file.

The system generates a SHA-256 hash of the file.

The hash is stored on the blockchain via a smart contract.

Anyone can verify a certificate by re-hashing the file and matching it against the on-chain record.

No actual certificate files are stored on-chain — only cryptographic hashes.

Smart Contract

Written in Solidity (v0.8.21).

Core Functions

issueCertificate(studentId, hash)

verifyCertificate(studentId, hash)

revokeCertificate(studentId)

getCertificate(studentId)

Each certificate record contains:

Hash

Timestamp

Revocation status

Tech Stack

Solidity

Hardhat

Ethers.js

MetaMask

Next.js (Frontend)

CryptoJS (SHA-256 hashing)

How It Works
Certificate Issuance

File → SHA-256 hash generated in frontend

Hash submitted to smart contract

Transaction recorded on Ethereum network

Certificate Verification

File is hashed again

Hash compared with stored blockchain record

Returns true/false based on authenticity and revocation status

Setup & Run Locally
1. Install dependencies
npm install

2. Start Hardhat local node
npx hardhat node

3. Deploy contract
npx hardhat run scripts/deploy.js --network localhost


Update the deployed contract address in the frontend.

4. Start frontend
npm run dev


Make sure MetaMask is connected to:

Network: Hardhat Local

Chain ID: 31337

Security Design

SHA-256 hashing ensures certificate integrity

Smart contract prevents unauthorized tampering

Revocation mechanism allows invalidation of compromised certificates

No sensitive files stored on-chain

Future Improvements

Role-based access control (only institutions can issue certificates)

Deployment to Sepolia testnet

QR-code based verification system

Institutional login authentication

IPFS integration for decentralized file storage

Why Blockchain?

Blockchain ensures:

Immutability

Transparency

Cryptographic trust

Decentralized verification

This removes reliance on centralized verification authorities.
