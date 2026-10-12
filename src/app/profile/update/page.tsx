"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে!");
    } else {
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
        তথ্য আপডেট করুন
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            নতুন নাম
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-[#047857] hover:bg-[#065f46] text-white border-none"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট তথ্য"}
        </button>
      </form>
    </div>
  );
}