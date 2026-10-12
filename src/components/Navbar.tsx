"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getBanglaDate, toBanglaDigits } from "@/lib/utils";
import { fetchWithFallback } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<any[]>([]);
  const [tickerProducts, setTickerProducts] = useState<any[]>([]);
  const [banglaDate, setBanglaDate] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { data: session } = authClient.useSession();

  useEffect(() => {
    // Client-side তারিখ সেটিং (Next.js 16 Error এড়ানোর জন্য)
    setBanglaDate(getBanglaDate(new Date()));

    fetchWithFallback("/categories").then((res: any) => {
      setCategories(Array.isArray(res) ? res : []);
    });
    fetchWithFallback("/products").then((res: any) => {
      setTickerProducts(Array.isArray(res) ? res.slice(0, 10) : res?.data?.slice(0, 10) || []);
    });

    // dropdown baire click korle bondho
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  return (
    <nav className="bg-[#F4F6F0] sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Date */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-[#047857] text-white p-2 rounded-2xl flex items-center justify-center shadow-sm w-11 h-11">
            <Image src="/logo-icon.png" alt="বাজার দর লোগো" width={22} height={22} className="brightness-0 invert" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">বাজার দর</h1>
            <p className="text-[11px] text-gray-500 font-medium">{banglaDate || "মঙ্গলবাৰ, ৬ অক্টোবর, ২০২৫"}</p>
          </div>
        </Link>

        {/* Auth Buttons */}
        <div>
          {session?.user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2">
                <img src={session.user.image || "https://i.ibb.co/mR40Bmy/user-avatar.png"} alt="avatar" className="w-8 h-8 rounded-full border border-gray-200" />
                <span className="text-sm font-bold text-gray-800 hidden sm:block">{session.user.name} ▾</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-lg p-3 z-50">
                  <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                  <p className="text-[11px] text-gray-500 truncate mb-2">{session.user.email}</p>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="block text-xs font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg">
                    👤 আমার প্রোফাইল
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                    ↩ সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/signin" className="text-sm font-bold text-gray-800 hover:text-[#047857] px-3">
                সাইন ইন
              </Link>
              <Link href="/signup" className="text-sm font-bold bg-[#047857] hover:bg-[#065f46] text-white px-5 py-2 rounded-xl shadow-sm">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Links */}
      {categories.length > 0 && (
        <div className="bg-white border-t border-b border-gray-200 py-2">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Link href="/" className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${pathname === "/" ? "bg-[#047857] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              🏠 হোম
            </Link>
            {categories.map((cat: any) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link key={cat.slug} href={`/category/${cat.slug}`} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${isActive ? "bg-[#047857] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  <span>{cat.icon}</span> <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Ticker / Marquee */}
      {tickerProducts.length > 0 && (
        <div className="bg-white border-b border-gray-200 py-1.5 overflow-hidden">
          <div className="animate-marquee gap-8 text-xs font-medium text-gray-700">
            {[...tickerProducts, ...tickerProducts].map((item: any, idx: number) => {
              const changePct = item.change?.pct || 0;
              const dir = item.change?.dir || "flat";
              return (
                <span key={idx} className="inline-flex items-center gap-1.5">
                  <span>{item.image}</span>
                  <span className="font-semibold">{item.nameBn}</span>
                  <span className="text-gray-500">{toBanglaDigits(item.today)} টাকা/{item.unit}</span>
                  <span className={dir === "up" ? "text-red-600" : dir === "down" ? "text-[#047857]" : "text-gray-500"}>
                    {dir === "up" ? `▲ ${toBanglaDigits(changePct)}%` : dir === "down" ? `▼ ${toBanglaDigits(Math.abs(changePct))}%` : `— ০.০%`}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}