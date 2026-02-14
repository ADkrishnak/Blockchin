"use client";

import { useState } from "react";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import contractABI from "../../abi/BlockCert.json";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [university, setUniversity] = useState("Versathon University");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setStatus("Select a file first");
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        setStatus("Hashing file...");

        const wordArray = CryptoJS.lib.WordArray.create(
          e.target?.result as ArrayBuffer
        );
        const hash = CryptoJS.SHA256(wordArray).toString();

        if (!(window as any).ethereum) {
          setStatus("Install MetaMask");
          setLoading(false);
          return;
        }

        setStatus("Connecting wallet...");
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(
          (window as any).ethereum
        );
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          "PASTE_YOUR_CONTRACT_ADDRESS",
          (contractABI as any).abi,
          signer
        );

        setStatus("Sending transaction...");
        const tx = await contract.storeCertificate(
          "0x" + hash,
          university
        );

        setStatus("⛏ Waiting confirmation...");
        await tx.wait();

        setStatus("Certificate Stored Successfully!");
      } catch (err: any) {
        setStatus("" + err.message);
      }

      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Upload Certificate
        </h2>

        {/* File Input */}
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
          className="mb-4 w-full border p-2 rounded text-black"
        />

        {/* University Input */}
        <input
          className="border p-2 w-full rounded mb-4 text-black"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          placeholder="University Name"
        />

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg transition"
        >
          {loading ? "Processing..." : "Upload Certificate"}
        </button>

        {/* Status */}
        {status && (
          <p className="mt-4 text-center font-semibold text-black">
            {status}
          </p>
        )}

      </div>
    </main>
  );
}
