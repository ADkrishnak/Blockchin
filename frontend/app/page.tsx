"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex flex-col items-center justify-center text-center px-6">

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          BlockCert
        </h1>

        <p className="text-gray-500 mb-8">
          Secure Blockchain Certificate Verification
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link href="/upload">
            <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-lg w-full">
              Upload Certificate
            </button>
          </Link>

          <Link href="/verify">
            <button className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg w-full">
              Verify Certificate
            </button>
          </Link>
        </div>

        {/* Flow Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">
            How It Works
          </h2>

          <div className="space-y-3 text-gray-600">
            <p>University uploads certificate</p>
            <p>File converted to SHA256 hash</p>
            <p>Hash stored on blockchain</p>
            <p>Employer verifies certificate</p>

            <p className="font-semibold text-green-600 text-lg mt-3">
              Real &nbsp;&nbsp; Fake
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <p className="text-white text-sm mt-6 opacity-80"> 
      </p>

    </main>
  );
}
