"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
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
    <div className="max-w-md mx-auto my-12 px-4">
      <h2 className="text-2xl font-extrabold text-center mb-1 text-gray-900">
        সাইন ইন
      </h2>
      <p className="text-xs text-center text-gray-500 mb-6">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}
          className="btn btn-outline w-full text-sm font-normal border-gray-300"
        >
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/" })}
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
          সাইন আপ করুন
        </Link>
      </p>
    </div>
      <Link href="/" className="block text-center text-[11px] text-gray-500 hover:text-emerald-700 mt-4">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}