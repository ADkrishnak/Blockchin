"use client";

import { useState } from "react";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import contractABI from "../../abi/BlockCert.json";

export default function Verify() {
  const [file, setFile] = useState<File | null>(null);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("");
  const [verified, setVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!file || !studentId) {
      setStatus("Please select certificate file and enter Student ID.");
      return;
    }

    try {
      setLoading(true);
      setVerified(null);
      setStatus("Generating SHA-256 hash...");

      const arrayBuffer = await file.arrayBuffer();
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      const hash = CryptoJS.SHA256(wordArray).toString();

      if (!(window as any).ethereum) {
        setStatus("MetaMask not detected.");
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 31337n) {
        setStatus("⚠️ Please switch to Hardhat Local (Chain ID 31337).");
        setLoading(false);
        return;
      }

      const signer = await provider.getSigner();

      const contractAddress = ethers.getAddress(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      );

      const contract = new ethers.Contract(
        contractAddress,
        (contractABI as any).abi,
        signer
      );

      setStatus("Querying blockchain record...");

      const isValid: boolean = await contract.verifyCertificate(
        studentId,
        hash
      );

      setVerified(isValid);

      if (isValid) {
        setStatus("Blockchain record matched.");
      } else {
        setStatus("No matching blockchain record found.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("Verification failed. Check console.");
      setVerified(false);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center px-6 text-white">

      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-3">
          Verify Academic Credential
        </h2>

        <p className="text-gray-300 text-sm text-center mb-8">
          Validate certificate authenticity using blockchain-stored cryptographic hash.
        </p>

        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="mb-4 w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
          className="mb-6 w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-gray-300"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify on Blockchain"}
        </button>

        {status && (
          <div className="mt-6 text-center text-sm text-gray-300">
            {status}
          </div>
        )}

        {verified !== null && (
          <div
            className={`mt-8 p-6 rounded-xl text-center font-bold text-lg border ${verified
                ? "bg-green-500/10 text-green-400 border-green-500"
                : "bg-red-500/10 text-red-400 border-red-500"
              }`}
          >
            {verified
              ? "VALID CERTIFICATE ✔"
              : "INVALID OR TAMPERED CERTIFICATE ✖"}
          </div>
        )}

      </div>
    </main>
  );
}








