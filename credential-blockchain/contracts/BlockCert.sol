// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract BlockCert {
    struct Certificate {
        string hash;
        uint256 timestamp;
        bool revoked;
    }

    mapping(string => Certificate) public certificates;

    // Issue a certificate for a student
    function issueCertificate(string memory studentId, string memory hash) public {
        certificates[studentId] = Certificate(hash, block.timestamp, false);
    }

    // Verify a certificate for a student
    function verifyCertificate(string memory studentId, string memory hash) public view returns (bool) {
        Certificate memory cert = certificates[studentId];
        return keccak256(bytes(cert.hash)) == keccak256(bytes(hash)) && !cert.revoked;
    }

    // Optional: revoke a certificate
    function revokeCertificate(string memory studentId) public {
        certificates[studentId].revoked = true;
    }

    // Get certificate info
    function getCertificate(string memory studentId) public view returns (string memory hash, uint256 timestamp, bool revoked) {
        Certificate memory cert = certificates[studentId];
        return (cert.hash, cert.timestamp, cert.revoked);
    }
}

