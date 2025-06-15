"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../api/auth";

export default function JoinNow() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | Your Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @keyframes rotateRing {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes rotateRingReverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes rotateRingSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-rotateRing {
            animation: rotateRing 10s linear infinite;
          }
          .animate-rotateRingReverse {
            animation: rotateRingReverse 16s linear infinite;
          }
          .animate-rotateRingSlow {
            animation: rotateRingSlow 24s linear infinite;
          }
        `}</style>
      </Head>

      <div className="relative h-screen w-screen bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] flex items-center justify-center overflow-hidden">
        <div className="absolute w-[420px] h-[420px] rounded-full border-t-4 border-white/20 animate-rotateRing" />
        <div className="absolute w-[480px] h-[480px] rounded-full border-b-4 border-white/10 animate-rotateRingReverse" />
        <div className="absolute w-[540px] h-[540px] rounded-full border-l-4 border-white/5 animate-rotateRingSlow" />

        <div
          className={`relative w-115 h-115 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col justify-center items-center transition-all duration-700 ease-out transform z-10 px-8 ${
            show ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-2">Create Account</h2>
          <p className="text-white/80 text-sm text-center mb-6 px-6">
            Please fill in the details to sign up
          </p>

          {error && (
            <div className="mb-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-3 py-2 rounded-full bg-white/20 placeholder-white/70 text-white text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-3 py-2 rounded-full bg-white/20 placeholder-white/70 text-white text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-3 py-2 rounded-full bg-white/20 placeholder-white/70 text-white text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full px-3 py-2 rounded-full bg-white/20 placeholder-white/70 text-white text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-full bg-white text-blue-700 font-semibold text-sm transition-all ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-gray-100 hover:scale-105 active:scale-95"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center ">
                  <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin mr-2" />
                  Signing up...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-center text-white/80 text-xs mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-white font-semibold hover:underline hover:text-white/90">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
