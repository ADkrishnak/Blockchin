"use client";

import { useState } from "react";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import contractABI from "../../abi/BlockCert.json";

export default function Verify() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!file) {
      setResult("Select a file first");
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        setResult("Hashing file...");

        const wordArray = CryptoJS.lib.WordArray.create(
          e.target?.result as ArrayBuffer
        );
        const hash = CryptoJS.SHA256(wordArray).toString();

        if (!(window as any).ethereum) {
          setResult("Install MetaMask");
          setLoading(false);
          return;
        }

        const provider = new ethers.BrowserProvider(
          (window as any).ethereum
        );

        const contract = new ethers.Contract(
          "PASTE_YOUR_CONTRACT_ADDRESS",
          (contractABI as any).abi,
          provider
        );

        setResult("Checking blockchain...");

        const res = await contract.verifyCertificate("0x" + hash);

        if (!res[0]) {
          setResult("Certificate Not Found");
        } else if (res[3]) {
          setResult("Certificate Revoked");
        } else {
          const date = new Date(Number(res[2]) * 1000);

          setResult(
            `VERIFIED\n\n${res[1]}\n${date.toLocaleDateString()}`
          );
        }
      } catch (err: any) {
        setResult("Error verifying certificate");
      }

      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Verify Certificate
        </h2>

        {/* File Input */}
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
          className="mb-4 w-full border p-2 rounded text-black"
        />

        {/* Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg transition"
        >
          {loading ? "Checking..." : "Verify Certificate"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center whitespace-pre-line text-black font-medium">
            {result}
          </div>
        )}

      </div>
    </main>
  );
}
