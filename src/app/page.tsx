"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { fetchWithFallback } from "@/lib/api";
import { toBanglaDigits } from "@/lib/utils";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithFallback("/products")
      .then((res:any) => {
        const data = res?.data || res || [];
        setProducts(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  // Section A: Top 6 Risers
  const risers = [...products]
    .filter((p) => (p.changePercent || p.change_percent || 0) > 0)
    .sort((a, b) => (b.changePercent || b.change_percent) - (a.changePercent || a.change_percent))
    .slice(0, 6);

  // Section B: Top 6 Fallers
  const fallers = [...products]
    .filter((p) => (p.changePercent || p.change_percent || 0) < 0)
    .sort((a, b) => (a.changePercent || a.change_percent) - (b.changePercent || b.change_percent))
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Hero />

      <div className="space-y-10">
        {/* Section A: আজ দাম বেড়েছে ▲ */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-600 font-black text-lg">▲</span>
            <h2 className="text-lg font-extrabold text-gray-900">আজ দাম বেড়েছে</h2>
          </div>
          {loading ? (
            <SkeletonLoader count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {risers.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section B: আজ দাম কমেছে ▼ */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-700 font-black text-lg">▼</span>
            <h2 className="text-lg font-extrabold text-gray-900">আজ দাম কমেছে</h2>
          </div>
          {loading ? (
            <SkeletonLoader count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fallers.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section C: সব পণ্য */}
        <section id="all-products" className="pt-4">
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-gray-900">সব পণ্য</h2>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              মোট {toBanglaDigits(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          {loading ? (
            <SkeletonLoader count={12} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}