"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { getProductBySlugOrId } from "@/lib/api";
import { toBanglaDigits, formatBanglaPrice, getBanglaUnit } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    // Protected Route Check
    if (!session) {
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন!");
      router.push("/signin");
      return;
    }

    getProductBySlugOrId(slug as string)
      .then((data: any) => {
        setProduct(data);
      })
      .finally(() => setLoading(false));
  }, [slug, session, isPending, router]);

  if (isPending || loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 animate-pulse h-32" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/80 animate-pulse h-24" />
          ))}
        </div>
        <p className="text-center text-xs font-medium text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2">পণ্যটি পাওয়া যায়নি!</h2>
        <Link href="/" className="bg-[#047857] text-white text-xs font-semibold px-4 py-2 rounded-lg">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const changeDir = product.change?.dir || "flat";
  const changePct = product.change?.pct ?? 0;
  const isUp = changeDir === "up" || changePct > 0;
  const isDown = changeDir === "down" || changePct < 0;

  // Market Price Calculations
  const markets = product.markets || [];
  const minPrices = markets.map((m: any) => m.min);
  const maxPrices = markets.map((m: any) => m.max);

  const overallMin = minPrices.length > 0 ? Math.min(...minPrices) : product.today;
  const overallMax = maxPrices.length > 0 ? Math.max(...maxPrices) : product.today;
  const overallAvg = product.today;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-[11px] text-gray-500 font-medium mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700">হোম</Link>
        <span>&gt;</span>
        <Link href={`/category/${product.category}`} className="hover:text-emerald-700">{product.categoryNameBn}</Link>
        <span>&gt;</span>
        <span className="text-gray-800">{product.nameBn}</span>
      </div>

      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
            {product.image || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{product.nameBn}</h1>
            <p className="text-xs text-gray-500 mt-1">{getBanglaUnit(product.unit)} · {product.categoryNameBn}</p>
            <p className="text-[11px] text-gray-500 mt-1.5">
              গতকালের তুলনায় আজ দাম {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"} · {toBanglaDigits(Math.abs((product.today || 0) - (product.yesterday || 0)))} টাকা
            </p>
            <div className="flex gap-1.5 mt-2">
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">{product.categoryNameBn}</span>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{getBanglaUnit(product.unit)}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F4F6F0] rounded-xl p-4 text-center min-w-[160px] border border-gray-200/60">
          <p className="text-[10px] text-gray-500 font-medium">আজকের গড় দাম</p>
          <p className="text-2xl font-black text-gray-900 my-0.5">
            {formatBanglaPrice(overallAvg)}
          </p>
          <p className="text-[10px] text-gray-500 mb-1.5">টাকা / {product.unit}</p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center justify-center gap-0.5 w-max mx-auto ${
            isUp ? "bg-red-50 text-red-600" : isDown ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
          }`}>
            {isUp && `▲ ${toBanglaDigits(Math.abs(changePct))}%`}
            {isDown && `▼ ${toBanglaDigits(Math.abs(changePct))}%`}
            {!isUp && !isDown && `— ০.০%`}
          </span>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
            <p className="text-[11px] text-gray-500 font-medium">সর্বনিম্ন দাম</p>
            <p className="text-lg font-extrabold text-emerald-600 mt-0.5">{formatBanglaPrice(overallMin)} টাকা</p>
            <p className="text-[10px] text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
            <p className="text-[11px] text-gray-500 font-medium">সর্বাধিক দাম</p>
            <p className="text-lg font-extrabold text-red-600 mt-0.5">{formatBanglaPrice(overallMax)} টাকা</p>
            <p className="text-[10px] text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
            <p className="text-[11px] text-gray-500 font-medium">গড় দাম</p>
            <p className="text-lg font-extrabold text-gray-900 mt-0.5">{formatBanglaPrice(overallAvg)} টাকা</p>
            <p className="text-[10px] text-gray-400 mt-1">{getBanglaUnit(product.unit)}-এর হিসাবে</p>
          </div>
        </div>
      </div>

      {/* Market Breakdown Table */}
      {markets.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-gray-800 mb-4">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] text-gray-500 font-semibold">
                  <th className="py-3 px-2">বাজার</th>
                  <th className="py-3 px-2">বিভাগ</th>
                  <th className="py-3 px-2">সর্বনিম্ন</th>
                  <th className="py-3 px-2">সর্বাধিক</th>
                  <th className="py-3 px-2 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-gray-700 divide-y divide-gray-50">
                {markets.map((m: any, idx: number) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="py-3 px-2 text-gray-900 font-bold">{m.market}</td>
                      <td className="py-3 px-2 text-gray-500">{m.division}</td>
                      <td className="py-3 px-2">{formatBanglaPrice(m.min)} টাকা</td>
                      <td className="py-3 px-2">{formatBanglaPrice(m.max)} টাকা</td>
                      <td className="py-3 px-2 text-right font-extrabold text-gray-900">{formatBanglaPrice(marketAvg)} টাকা</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}