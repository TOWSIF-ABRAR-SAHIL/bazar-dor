"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { fetchWithFallback } from "@/lib/api";
import { toBanglaDigits } from "@/lib/utils";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    setLoading(true);
    
    Promise.all([
      fetchWithFallback(`/categories/${slug}`),
      fetchWithFallback(`/products?category=${slug}`)
    ]).then(([catRes, prodRes]) => {
      const catData = Array.isArray(catRes) ? catRes[0] : catRes?.data || catRes;
      const prodData = Array.isArray(prodRes) ? prodRes : prodRes?.data || [];
      
      setCategoryInfo(catData);
      setProducts(prodData);
    }).finally(() => setLoading(false));
  }, [slug]);

  // C1 Challenge: Numeric sorting for price (`today`)
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Number(a.today || 0);
    const priceB = Number(b.today || 0);

    if (sortType === "low-to-high") return priceA - priceB;
    if (sortType === "high-to-low") return priceB - priceA;
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SkeletonLoader count={8} />
      </div>
    );
  }

  // Invalid slug or empty category state
  if (!loading && products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-4">🛒</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">ক্যাটেগরিটি পাওয়া যায়নি বা কোনো পণ্য নেই!</h1>
        <p className="text-xs text-gray-500 mb-6">আপনি যে ক্যাটেগরিটি খুঁজছেন তাতে বর্তমানে কোনো পণ্য উপলব্ধ নেই।</p>
        <Link href="/" className="bg-[#047857] hover:bg-[#065f46] text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-colors">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Header & Sort Dropdown */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F4F6F0] rounded-full flex items-center justify-center text-2xl">
            {categoryInfo?.icon || products[0]?.categoryIcon || "📦"}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{categoryInfo?.nameBn || products[0]?.categoryNameBn || slug}</h1>
            <p className="text-xs text-gray-500 font-medium">{toBanglaDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>

        {/* C1 Challenge: Sort Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600">সাজান:</span>
          <div className="relative">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-[#047857] bg-white cursor-pointer font-medium text-gray-700 appearance-none"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}