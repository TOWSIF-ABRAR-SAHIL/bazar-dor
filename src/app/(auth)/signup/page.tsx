"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না! আবার লিখুন।");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে!");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
    } else {
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/signin");
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <h2 className="text-2xl font-extrabold text-center mb-1 text-gray-900">অ্যাকাউন্ট তৈরি করুন</h2>
      <p className="text-xs text-center text-gray-500 mb-6">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন</p>
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
          <input
            type="text"
            placeholder="যেমন: রহিম উদ্দিন"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
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
          <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            type="password"
            placeholder="আবার লিখুন"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none mt-2"
        >
          {loading ? "প্রসেসিং..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="divider text-xs text-gray-400 my-4">অথবা</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/?login=success" })}
          className="btn btn-outline w-full text-sm font-normal border-gray-300"
        >
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/?login=success" })}
          className="btn btn-outline w-full text-sm font-normal border-gray-300"
        >
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-emerald-600 font-semibold hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
      <Link href="/" className="block text-center text-[11px] text-gray-500 hover:text-emerald-700 mt-4">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}