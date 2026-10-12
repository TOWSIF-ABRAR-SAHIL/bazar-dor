"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { fetchWithFallback } from "@/lib/api";
import { toBanglaDigits } from "@/lib/utils";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Social login ses e welcome toast (ekbar)
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "success") {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    fetchWithFallback("/products")
      .then((res: any) => {
        const data = Array.isArray(res) ? res : res?.data || [];
        setProducts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Section A: Top 6 Risers (dir === "up")
  const risers = [...products]
    .filter((p) => p.change?.dir === "up" || (p.change?.pct || 0) > 0)
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Section B: Top 6 Fallers (dir === "down")
  const fallers = [...products]
    .filter((p) => p.change?.dir === "down" || (p.change?.pct || 0) < 0)
    .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0))
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
          ) : risers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {risers.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 font-medium">আজ কোনো পণ্যের দাম বাড়েনি।</p>
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
          ) : fallers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fallers.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 font-medium">আজ কোনো পণ্যের দাম কমেনি।</p>
          )}
        </section>

        {/* Section C: সব পণ্য */}
        <section id="সব-পণ্য" className="pt-4">
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-gray-900">সব পণ্য</h2>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              মোট {toBanglaDigits(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          {loading ? (
            <SkeletonLoader count={12} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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