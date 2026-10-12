"use client";

import Link from "next/link";
import { toBanglaDigits, formatBanglaPrice, getBanglaUnit } from "@/lib/utils";
import EmojiImage from "@/components/EmojiImage";

interface ProductProps {
  product: any;
}

export default function ProductCard({ product }: ProductProps) {
  const productName = product.nameBn || "অজানা পণ্য";
  const price = product.today || 0;
  
  const changePct = product.change?.pct || 0;
  const changeDir = product.change?.dir || "flat";
  
  const isUp = changeDir === "up";
  const isDown = changeDir === "down";

  const emoji = product.image || product.categoryIcon || "🛒";
  const displayUnit = getBanglaUnit(product.unit);

  return (
    <Link href={`/product/${product.slug || product.id}`}>
      <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group h-full">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#F4F6F0] flex items-center justify-center group-hover:scale-105 transition-transform">
              <EmojiImage emoji={emoji} className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-[#047857] transition-colors">
                {productName}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                {displayUnit}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 font-medium mb-1">আজকের দাম</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-gray-900">
              {formatBanglaPrice(price)} টাকা
            </span>

            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 ${
                isUp ? "bg-red-50 text-red-600" : isDown ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {isUp && `▲ ${toBanglaDigits(changePct)}%`}
              {isDown && `▼ ${toBanglaDigits(Math.abs(changePct))}%`}
              {!isUp && !isDown && `— ০.০%`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}