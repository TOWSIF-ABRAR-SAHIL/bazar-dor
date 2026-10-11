import React from "react";

export default function Hero() {
  return (
    <section className="bg-[#F4F6F0] rounded-2xl mb-8 border border-gray-200/60 p-6 md:p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
      <div className="flex-1 text-center md:text-left">
        <span className="inline-block bg-white text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full mb-4 shadow-sm border border-gray-100">
          মঙ্গলবার, ৬ অক্টোবর, ২০২৩
        </span>
        <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed max-w-md mb-6 font-medium">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#all-products"
          className="inline-block bg-[#047857] hover:bg-[#065f46] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex-1 flex justify-center md:justify-end">
        <div className="w-40 h-40 md:w-56 md:h-56 bg-white rounded-3xl flex items-center justify-center text-7xl md:text-8xl shadow-sm border border-gray-100">
          🧺
        </div>
      </div>
    </section>
  );
}