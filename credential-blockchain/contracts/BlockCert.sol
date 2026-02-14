// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract BlockCert {
    mapping(string => string) public certificateHashes;

    function issueCertificate(string memory studentId, string memory hash) public {
        certificateHashes[studentId] = hash;
    }

    function verifyCertificate(string memory studentId, string memory hash) public view returns (bool) {
        return keccak256(bytes(certificateHashes[studentId])) == keccak256(bytes(hash));
    }
}
