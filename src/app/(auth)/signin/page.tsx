"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!");
    } else {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
        সাইন ইন করুন
      </h2>

      <form onSubmit={handleSignIn} className="space-y-4 mt-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            ইমেইল
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-[#047857] hover:bg-[#065f46] text-white border-none mt-2"
        >
          {loading ? "প্রসেসিং..." : "সাইন ইন"}
        </button>
      </form>

      <div className="divider text-xs text-gray-400 my-4">অথবা</div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => authClient.signIn.social({ provider: "google" })}
          className="btn btn-outline w-full text-sm font-normal border-gray-300"
        >
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => authClient.signIn.social({ provider: "github" })}
          className="btn btn-outline w-full text-sm font-normal border-gray-300"
        >
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="text-[#047857] font-semibold hover:underline"
        >
          রেজিস্ট্রেশন করুন
        </Link>
      </p>
    </div>
  );
}