"use client";

import Link from "next/link";
import { toBanglaDigits, formatBanglaPrice } from "@/lib/utils";

interface ProductProps {
  product: any;
}

export default function ProductCard({ product }: ProductProps) {
  const price = product.avgPrice || product.price || 0;
  const changeVal = product.changePercent || product.change_percent || 0;
  
  const isUp = changeVal > 0;
  const isDown = changeVal < 0;

  return (
    <Link href={`/product/${product.slug || product.id}`}>
      <div className="bg-white rounded-2xl p-4 border border-gray-200/60 hover:shadow-md transition-all cursor-pointer h-full flex flex-col justify-between group">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F4F6F0] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              {product.emoji || "🛒"}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 transition-colors">
                {product.name}
              </h3>
              <p className="text-[10px] text-gray-400 font-medium">
                {product.unit || "প্রতি কেজি"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-gray-400 font-medium">আজকের দাম</p>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-base font-black text-gray-900">
              {formatBanglaPrice(price)} টাকা
            </span>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5 ${
                isUp ? "bg-red-50 text-red-600" : isDown ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {isUp && `▲ ${toBanglaDigits(Math.abs(changeVal).toFixed(1))}%`}
              {isDown && `▼ ${toBanglaDigits(Math.abs(changeVal).toFixed(1))}%`}
              {!isUp && !isDown && `— ০.০%`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}