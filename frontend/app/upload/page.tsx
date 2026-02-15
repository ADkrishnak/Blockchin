"use client";

import { useState } from "react";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import contractABI from "../../abi/BlockCert.json";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !studentId) {
      setStatus("Please select a certificate file and enter Student ID.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Generating SHA-256 hash...");

      
      const arrayBuffer = await file.arrayBuffer();
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      const hash = CryptoJS.SHA256(wordArray).toString();

      if (!(window as any).ethereum) {
        setStatus("MetaMask not detected.");
        setLoading(false);
        return;
      }

      await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 31337n) {
        setStatus("⚠️ Please switch to Hardhat Local network (Chain ID 31337).");
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

      setStatus("Submitting transaction to blockchain...");

      const tx = await contract.issueCertificate(studentId, hash);
      setTxHash(tx.hash);

      await tx.wait();

      setStatus("✅ Certificate successfully recorded on blockchain!");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Transaction failed. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl p-10">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">
          Issue Academic Certificate
        </h2>

        <p className="text-sm text-slate-400 text-center mb-8">
          Generate SHA-256 hash and store it immutably on blockchain.
        </p>

        {/* Student ID */}
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="mb-4 w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
          className="mb-6 w-full bg-slate-800 border border-slate-700 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
        />

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? "Processing..." : "Record on Blockchain"}
        </button>

        {/* Status */}
        {status && (
          <div className="mt-6 text-center text-sm font-medium text-slate-300">
            {status}
          </div>
        )}

        {/* TX Hash */}
        {txHash && (
          <div className="mt-4 text-xs text-slate-500 break-all text-center">
            Transaction Hash:
            <div className="mt-1 font-mono text-indigo-400">
              {txHash}
            </div>
          </div>
        )}

        {/* Faucet Button (Dev Only) */}
        <button
          onClick={async () => {
            if (!window.ethereum) return;
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
              await provider.send("hardhat_setBalance", [
                accounts[0].address,
                "0x100000000000000000000", // 256 ETH
              ]);
              setStatus("💰 256 ETH added to your wallet (Localhost only)!");
            }
          }}
          className="mt-6 text-xs text-slate-500 hover:text-indigo-400 underline w-full text-center"
        >
          Need Test ETH? Click here to get 256 ETH
        </button>

      </div>
    </main>
  );

}





