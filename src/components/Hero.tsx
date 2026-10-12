import React from "react";
import Image from "next/image";
import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="bg-[#F4F6F0] rounded-2xl mb-8 border border-gray-200/60 p-6 md:p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
      <div className="flex-1 text-center md:text-left">
        <span className="inline-block bg-white text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full mb-3 shadow-xs border border-gray-100">
          {getBanglaDate()}
        </span>
        <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed max-w-md mb-6 font-medium">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#সব-পণ্য"
          className="inline-block bg-[#047857] hover:bg-[#065f46] text-white text-xs md:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-xs"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex-1 flex justify-center md:justify-end">
        <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl flex items-center justify-center shadow-xs border border-gray-100 p-4">
          <Image src="/bazar-hero.png" alt="তাজা বাজার পণ্যের ঝুড়ি" width={260} height={220} className="object-contain" priority />
        </div>
      </div>
    </section>
  );
}