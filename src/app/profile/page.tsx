"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="p-10 text-center text-sm">লোডিং...</div>;
  }

  if (!session) {
    return (
      <div className="p-10 text-center text-sm">
        প্রোফাইল দেখতে সাইন ইন করুন।
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h2>
      <p className="text-xs text-gray-500 mb-6 mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

    <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
      <img src={session.user.image || "https://i.ibb.co/mR40Bmy/user-avatar.png"} alt="avatar" className="w-16 h-16 rounded-2xl object-cover border border-gray-200" />
      <div className="flex-1 text-center sm:text-left">
        <p className="text-base font-bold text-gray-900">{session.user.name}</p>
        <p className="text-xs text-gray-500">{session.user.email}</p>
      </div>
      <button
        onClick={() => {
          authClient.signOut().then(() => {
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            setTimeout(() => (window.location.href = "/"), 800);
          });
        }}
        className="text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
      >
        → সাইন আউট
      </button>
    </div>

    <div className="mt-4 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3">তথ্য</h3>
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <p><span className="font-semibold text-gray-800">নাম:</span> {session.user.name}</p>
        <p><span className="font-semibold text-gray-800">ইমেইল:</span> {session.user.email}</p>
      </div>

      <Link
        href="/profile/update"
        className="btn bg-[#047857] hover:bg-[#065f46] text-white w-full text-sm font-medium border-none"
      >
        তথ্য আপডেট করুন
      </Link>
    </div>
    </div>
  );
}