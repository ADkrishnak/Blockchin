"use client";

import { useState } from "react";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import contractABI from "../../abi/BlockCert.json";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !studentId) {
      setStatus("Select a file and enter Student ID");
      return;
    }

    setLoading(true);

    try {
      // Hash the file
      const arrayBuffer = await file.arrayBuffer();
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      const hash = CryptoJS.SHA256(wordArray).toString();

      if (!(window as any).ethereum) {
        setStatus("Install MetaMask");
        setLoading(false);
        return;
      }

      setStatus("Connecting wallet...");
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Replace with your deployed contract address
      const contractAddress = ethers.getAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3");

      const contract = new ethers.Contract(contractAddress, (contractABI as any).abi, signer);

      setStatus("Sending transaction...");
      const tx = await contract.issueCertificate(studentId, hash);
      await tx.wait();

      setStatus("✅ Certificate Issued Successfully!");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Upload Certificate</h2>

        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="mb-4 w-full border p-2 rounded text-black"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mb-4 w-full border p-2 rounded text-black"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg transition"
        >
          {loading ? "Processing..." : "Upload Certificate"}
        </button>

        {status && <p className="mt-4 text-center font-semibold text-black">{status}</p>}
      </div>
    </main>
  );
}




