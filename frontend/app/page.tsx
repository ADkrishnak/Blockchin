"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white flex flex-col">

      {/* NAVBAR */}
      <header className="w-full backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
          <h1 className="text-2xl font-bold tracking-widest text-indigo-400">
            BLOCKCERT
          </h1>
          <p className="text-sm text-gray-300 hidden md:block">
            Blockchain Academic Credential Verification
          </p>
        </div>
      </header>

      {/* HERO */}
      <section className="flex flex-1 items-center justify-center px-6 text-center">
        <div className="max-w-5xl">

          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8">
            Trust Through
            <span className="text-indigo-400"> Cryptographic Proof</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            BlockCert secures academic certificates using SHA-256 hashing and blockchain
            immutability, enabling instant verification without relying on centralized authorities.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <Link href="/upload">
              <button className="px-10 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 w-full sm:w-auto">
                Issue Certificate
              </button>
            </Link>

            <Link href="/verify">
              <button className="px-10 py-4 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto">
                Verify Credential
              </button>
            </Link>
          </div>

          {/* FEATURE GRID */}
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-indigo-400 transition">
              <h3 className="text-indigo-400 font-semibold mb-3 text-lg">
                Cryptographic Security
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Certificates are hashed using SHA-256 before being recorded,
                ensuring tamper detection at the byte level.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-indigo-400 transition">
              <h3 className="text-indigo-400 font-semibold mb-3 text-lg">
                Decentralized Storage
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Hash records are stored on Ethereum-compatible blockchain networks,
                preventing unauthorized modification.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-indigo-400 transition">
              <h3 className="text-indigo-400 font-semibold mb-3 text-lg">
                Instant Verification
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Employers validate credentials within seconds without contacting
                issuing institutions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-400 text-sm">
        © 2026 BlockCert • Built for Transparent Academic Trust
      </footer>
    </main>
  );
}


