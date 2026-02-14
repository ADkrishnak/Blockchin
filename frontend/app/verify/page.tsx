"use client";

import { useState } from "react";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import contractABI from "../../abi/BlockCert.json";

export default function Verify() {
  const [file, setFile] = useState<File | null>(null);
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!file || !studentId) {
      setResult("Select a file and enter Student ID");
      return;
    }

    setLoading(true);

    try {
      // Hash the file
      const arrayBuffer = await file.arrayBuffer();
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      const hash = CryptoJS.SHA256(wordArray).toString();

      if (!(window as any).ethereum) {
        setResult("Install MetaMask");
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractAddress = ethers.getAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3");

      const contract = new ethers.Contract(contractAddress, (contractABI as any).abi, signer);

      setResult("Checking blockchain...");
      const isValid: boolean = await contract.verifyCertificate(studentId, hash);

      if (isValid) {
        setResult("✅ Certificate Verified!");
      } else {
        setResult("❌ Certificate Not Found or Invalid");
      }
    } catch (err: any) {
      console.error(err);
      setResult("❌ Error verifying certificate: " + err.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Verify Certificate</h2>

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
          onClick={handleVerify}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg transition"
        >
          {loading ? "Checking..." : "Verify Certificate"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center whitespace-pre-line text-black font-medium">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}






