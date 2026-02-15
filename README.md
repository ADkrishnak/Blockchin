BlockCert

Blockchain-Based Academic Credential Verification System

Overview

BlockCert is a decentralized application that enables secure issuance and verification of academic certificates using blockchain technology.

Certificates are validated through SHA-256 cryptographic hashing and stored immutably via smart contracts on Ethereum.

No certificate files are stored on-chain — only secure hash proofs.

Problem

Traditional certificate verification:

Manual and time-consuming

Vulnerable to forgery

Dependent on centralized systems

Academic credential fraud is rising. Verification needs to be instant, tamper-proof, and decentralized.

Solution

Upload certificate

Generate SHA-256 hash

Store hash on blockchain

Verify by re-hashing and matching on-chain

Fast. Secure. Trustless.

Smart Contract

Built with Solidity (v0.8.21)

Core Functions:

issueCertificate(studentId, hash)

verifyCertificate(studentId, hash)

revokeCertificate(studentId)

getCertificate(studentId)

Each record stores:

Hash

Timestamp

Revocation status

Tech Stack

Solidity

Hardhat

Ethers.js

MetaMask

Next.js

CryptoJS

How It Works
Issuance

File → SHA-256 → Blockchain Transaction

Verification

File → SHA-256 → Compare On-Chain → Valid / Invalid

Security

SHA-256 ensures integrity

Immutable smart contract storage

Revocation support

No sensitive data stored on-chain

Future Scope

Role-based access control

Sepolia deployment

QR-based verification

IPFS integration

Why Blockchain?

Immutability

Transparency

Cryptographic trust

Decentralized verification
