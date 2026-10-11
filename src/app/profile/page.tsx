"use client";

import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

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
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">আমার প্রোফাইল</h2>
      
      <div className="space-y-2 mb-6 text-sm text-gray-600">
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
  );
}